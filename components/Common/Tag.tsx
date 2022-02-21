import React, { ReactNode } from "react";
import style from "./Tag.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

type Props = {
  children: ReactNode;
  type?: "primary" | "secondary" | "default";
  onClick?: () => void;
};

// COMPONENT

const Tag = (props: Props) => {
  const tagType = props.type || "default";

  return (
    <span
      style={props.onClick && { cursor: "pointer" }}
      onClick={props.onClick || null}
      className={[style.container, style[`container_${tagType}`]].join(" ")}
    >
      {props.children}
    </span>
  );
};

export default Tag;
