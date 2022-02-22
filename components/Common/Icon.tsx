import React from "react";

import { default as CloseOutlined } from "@ant-design/icons/CloseOutlined";
import { default as MenuOutlined } from "@ant-design/icons/MenuOutlined";

type IconType = "CloseOutlined" | "MenuOutlined";

const renderIcon = (icon: IconType) => {
  switch (icon) {
    case "CloseOutlined":
      return <CloseOutlined />;
    case "MenuOutlined":
      return <MenuOutlined />;
    default:
      return null;
  }
};

interface Props {
  icon: IconType;
  className?: string;
}

const Icon = (props: Props) => {
  return <span className={props.className}>{renderIcon(props.icon)}</span>;
};

export default Icon;
