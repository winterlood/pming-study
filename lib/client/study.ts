import { app_types } from "@types";
import { timeForToday } from "./time";

export const getTraslatedStudyStatus = (status: app_types.StudyStatus) => {
  switch (status) {
    case "READY":
      return "준비중인";
    case "NOTUTOR":
      return "튜터모집";
    case "OPEN":
      return "참가 가능한";
    case "INPROGRESS":
      return "진행중인";
    case "CLOSE":
      return "종료된";
    default:
      return "";
  }
};

export const getStudyStatusTagType = (
  status: app_types.StudyStatus
): "primary" | "secondary" | "default" => {
  switch (status) {
    case "READY":
      return "default";
    case "NOTUTOR":
      return "default";
    case "OPEN":
      return "primary";
    case "INPROGRESS":
      return "secondary";
    case "CLOSE":
      return "default";
    default:
      return null;
  }
};

export const getLocaleEndDate = (endDateStr: string) => {
  const endDate = new Date(endDateStr);
  return `마감 ${timeForToday(endDate)}일 전`;
};
