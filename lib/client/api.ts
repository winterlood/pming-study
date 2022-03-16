import { api_types } from "@types";
import axios from "axios";

const ax = axios.create({
  baseURL: process.env.PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * [POST]
 * APPLY STUDY
 * 스터디 지원
 */
interface ApiOption {
  onSuccess: (res?: any) => void;
  onFail: (err?: any) => void;
}

interface ApplyStudyOption extends ApiOption {
  requestBody: api_types.StudyApplyRequestBody;
}

export const POST_applyStudy = async (option: ApplyStudyOption) => {
  const { requestBody, onSuccess, onFail } = option;
  ax.post(`/api/study/apply`, requestBody)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
};

/*
 * [GET]
 * GET STUDY APPLICANT
 * 스터디 지원자 불러오기
 */

interface GetApplicantOption extends ApiOption {
  study_id: string;
}

export const GET_studyApplicant = async (option: GetApplicantOption) => {
  const { study_id, onSuccess, onFail } = option;
  axios
    .get(`/api/study/applicant?study_id=${study_id}`)
    .then((res) => {
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
};

/*
 * [GET]
 * GET PAGE BLOCKS
 * 페이지 블럭 가져오기
 */

interface GetPageOption extends ApiOption {
  page_id: string;
}
export const GET_pageBlocks = async (option: GetPageOption) => {
  const { page_id, onSuccess, onFail } = option;
  axios
    .get(`/api/blocks/?page_id=${page_id}`)
    .then((res) => {
      console.log(res);
      onSuccess(res);
    })
    .catch((err) => {
      onFail(err);
    });
};
