import React, { ReactNode } from "react";
import style from "./Section.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

// COMPONENT

const Section = (props: Props) => {
  return (
    <section className={[style.container, props.className].join(" ")}>
      {props.title && (
        <div className={style.head}>
          <h3>{props.title}</h3>
        </div>
      )}
      <div>{props.children}</div>
    </section>
  );
};

export default Section;
