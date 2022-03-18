import React, { ReactNode } from "react";
import Tag from "components/Common/Tag";
import { app_types } from "@types";
import {
  getStudyStatusTagType,
  getTraslatedStudyStatus,
} from "lib/client/study";
// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  studyStatus: app_types.StudyStatus;
  children?: ReactNode;
  type?: "primary" | "secondary" | "default";
}

// COMPONENT

const StudyStatusTag = (props: Props) => {
  return (
    <Tag type={props.type || getStudyStatusTagType(props.studyStatus)}>
      {props.children || getTraslatedStudyStatus(props.studyStatus) + " 스터디"}
    </Tag>
  );
};

export default StudyStatusTag;
