import { api_types } from "@types";
import axios from "axios";

const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface WebhookProperty extends api_types.StudyApplyRequestBody {
  isSuccess: boolean;
  apply_date: string;
  study_page_url: string;
}

export const applyWebhook = async (param: WebhookProperty) => {
  const res = await axios
    .post(WEBHOOK_URL, {
      attachments: [
        {
          pretext: param.isSuccess
            ? `✅STUDY APPLY✅\n\n\n새로운 스터디 지원이 있습니다.\n\n현재 시간 : ${param.apply_date}\n아래 링크를 클릭하여 해당 스터디를 확인할 수 있습니다`
            : `🔥ERROR OCCURED🔥\n\n\n스터디 지원 오류가 발생하였습니다\n\n현재 시간 : ${param.apply_date}\n아래 링크를 클릭하여 해당 스터디를 확인할 수 있습니다`,
          title: `${param.target_study_id} 스터디`,
          title_link: param.study_page_url,
          color: param.isSuccess ? "blue" : "danger",
          fields: [
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "지원 일자(apply_date)",
              value: param.apply_date,
              short: true,
            },
            {
              title: "지원 스터디 ID(target_study_id)",
              value: param.target_study_id,
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "지원자 이름(applicant_name)",
              value: param.applicant_name,
              short: true,
            },
            {
              title: "지원자 카카오 ID(applicant_kakao_id)",
              value: param.applicant_kakao_id,
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "지원자 GitHub 주소(applicant_github_url)",
              value: param.applicant_github_url,
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "",
              value: "",
              short: true,
            },
            {
              title: "지원 동기(applicant_reason)",
              value: param.applicant_reason,
              short: false,
            },
          ],
        },
      ],
    })
    .then((res) => {
      console.log(res.data);
      return res;
    })
    .catch((err) => {
      console.log(err.message);
      return err.message;
    });
  return res;
};
