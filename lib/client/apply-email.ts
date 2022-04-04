import { api_types } from "@types";
import axios from "axios";

const EMAIL_BASE_URL = "https://api.emailjs.com/api/v1.0/email/send";

interface emailProperty {
  study_name: string;
  applicant_name: string;
  applicant_email: string;
}

export const applyEmail = async (param: emailProperty) => {
  const res = await axios
    .post(EMAIL_BASE_URL, {
      service_id: "프밍스터디",
      template_id: "template_ldoe7ot",
      user_id: "EAy604QSKalDZVEHd",
      template_params: {
        applicant_name: param.applicant_name,
        study_name: param.study_name,
        to_email: param.applicant_email,
      },
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
