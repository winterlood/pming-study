import { Client } from "@notionhq/client";
import { api_types } from "@types";

const notionClient = new Client({
  auth: process.env.NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  const { study_id } = req.query;
  notionClient.databases
    .query({
      database_id: process.env.NOTION_STUDY_APPLY_DATABASE,
      filter: {
        property: "target_study_id",
        text: {
          equals: study_id,
        },
      },
    })
    .then((response) => {
      console.log(response);
      res.status(200).json(response.results);
    })
    .catch((err) => {
      res.status(400).json({});
    });
}
