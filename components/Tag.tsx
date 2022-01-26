import React, { ReactNode } from "react";
import style from "./Tag.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

type Props = {
  children: ReactNode;
};

// COMPONENT

const Tag = ({ children }: Props) => {
  return <span className={style.container}>{children}</span>;
};

export default Tag;
