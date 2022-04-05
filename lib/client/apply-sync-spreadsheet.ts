import { api_types } from "@types";
import axios from "axios";

interface syncProperty extends api_types.StudyApplyRequestBody {
  spread_sheet_url: string;
}

export const applySyncSpreadSheet = async (param: syncProperty) => {
  const {
    target_study_id,
    applicant_name,
    applicant_email,
    applicant_kakao_id,
    applicant_reason,
    applicant_github_url,
    spread_sheet_url,
  } = param;

  const res = await axios
    .post("/api/study/post/spreadsheet", {
      target_study_id,
      applicant_name,
      applicant_email,
      applicant_kakao_id,
      applicant_reason,
      applicant_github_url,
      spread_sheet_url,
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
