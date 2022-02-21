import React, { ReactNode } from "react";
import style from "./DetailPageHeader.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  headChildren?: ReactNode;
  title: ReactNode;
  footerChildren?: ReactNode;
  noBorder?: boolean;
}

// COMPONENT

const DetailPageHeader = (props: Props) => {
  return (
    <div
      className={style.container}
      style={props.noBorder && { border: "none" }}
    >
      <div className={style.head_wrapper}>{props.headChildren}</div>
      <div className={style.title_wrapper}>
        <h1>{props.title}</h1>
      </div>
      <div className={style.footer_wrapper}>{props.footerChildren}</div>
    </div>
  );
};

export default DetailPageHeader;
