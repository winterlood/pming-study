import React, { ReactNode } from "react";
import style from "./MainLayout.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  children: ReactNode;
}

// COMPONENT

const MainLayout = (props: Props) => {
  return <main className={style.container}>{props.children}</main>;
};

export default MainLayout;
