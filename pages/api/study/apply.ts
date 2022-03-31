import { Client } from "@notionhq/client";
import { api_types } from "@types";
import { applyWebhook } from "lib/server/apply-webhook";

const buildRichTextObject = (text) => {
  return {
    rich_text: [
      {
        text: {
          content: text,
        },
      },
    ],
  };
};

const notionClient = new Client({
  auth: process.env.NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const date = new Date();
    const apply_date = `${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`;
    const reqObj: api_types.StudyApplyRequestBody = req.body;

    const {
      target_study_id,
      applicant_name,
      applicant_email,
      applicant_kakao_id,
      applicant_reason,
      applicant_github_url,
    } = reqObj;

    const study_page_url = `${process.env.BASE_URL}/study/${target_study_id}/recruit`;

    notionClient.pages
      .create({
        parent: {
          database_id: process.env.NOTION_STUDY_APPLY_DATABASE,
        },
        icon: {
          type: "emoji",
          emoji: "🚨",
        },
        properties: {
          apply_date: { title: [{ text: { content: apply_date } }] },
          target_study: {
            relation: [{ id: target_study_id }],
          },
          target_study_id: buildRichTextObject(target_study_id),
          applicant_name: buildRichTextObject(applicant_name),
          applicant_email: buildRichTextObject(applicant_email),
          applicant_kakao_id: buildRichTextObject(applicant_kakao_id),
          applicant_reason: buildRichTextObject(applicant_reason),
          applicant_github_url: { url: applicant_github_url },
        },
      })
      .then((_) => {
        applyWebhook({
          ...reqObj,
          apply_date,
          study_page_url,
          isSuccess: true,
        });
        res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        applyWebhook({
          ...reqObj,
          apply_date,
          study_page_url,
          isSuccess: false,
        });
        res.status(400).json({ message: "bad request" });
      });
  } else {
    res.status(400).json({ message: "올바른 호출이 아닙니다" });
  }
}
