import { notion_types } from "@types";
import React from "react";
import NotionText from "./NotionText";
import style from "./Callout.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.CalloutItem {}

// COMPONENT

const Callout = (props: Props) => {
  const { callout } = props;
  return (
    <div className={style.container}>
      <div>{callout.icon[callout.icon.type]}</div>
      <div>
        {callout.text.map((it, idx) => {
          return <NotionText key={props.id + idx} {...it} />;
        })}
      </div>
    </div>
  );
};

export default Callout;
