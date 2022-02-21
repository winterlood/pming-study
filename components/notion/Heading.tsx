import React, { ReactNode } from "react";
import { notion_types } from "@types";
import NotionText from "./NotionText";

type Props = notion_types.HeadingItem & {
  type: "heading_1" | "heading_2" | "heading_3";
};

// COMPONENT
const Heading = (props: Props) => {
  switch (props.type) {
    case "heading_1":
      return (
        <h1>
          {props.heading_1.text.map((it, idx) => (
            <NotionText key={props.id + "h1" + idx} {...it} />
          ))}
        </h1>
      );
    case "heading_2":
      return (
        <h2>
          {props.heading_2.text.map((it, idx) => (
            <NotionText key={props.id + "h2" + idx} {...it} />
          ))}
        </h2>
      );
    case "heading_3":
      return (
        <h3>
          {props.heading_3.text.map((it, idx) => (
            <NotionText key={props.id + "h3" + idx} {...it} />
          ))}
        </h3>
      );
    default:
      return null;
  }
};

export default Heading;
