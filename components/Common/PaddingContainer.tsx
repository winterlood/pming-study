import React, { ReactNode } from "react";
import style from "./PaddingContainer.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  children: ReactNode;
}

// COMPONENT

const PaddingContainer = (props: Props) => {
  return <div className={style.container}>{props.children}</div>;
};

export default PaddingContainer;
