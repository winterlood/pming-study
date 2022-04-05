import { api_types } from "@types";
import axios from "axios";
import moment from "moment-timezone";

interface SpreadSheetRequestBody extends api_types.StudyApplyRequestBody {
  spread_sheet_url: string;
}

export default async function handler(req, res) {
  const reqObj: SpreadSheetRequestBody = req.body;
  const {
    target_study_id,
    applicant_name,
    applicant_email,
    applicant_kakao_id,
    applicant_reason,
    applicant_github_url,
    spread_sheet_url,
  } = reqObj;

  const curDate = moment.tz("Asia/Seoul");
  const apply_date = `${curDate.toLocaleString()}`;

  axios
    .get(spread_sheet_url, {
      params: {
        apply_date,
        applicant_name,
        applicant_kakao_id,
        applicant_email,
        applicant_github_url,
        applicant_reason,
      },
    })
    .then((_) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}
