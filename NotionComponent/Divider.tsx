import React from "react";
import style from "./Divider.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {}

// COMPONENT

const Divider = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.divider_wrapper}>
        <div className={style.divider} />
      </div>
    </div>
  );
};

export default Divider;
