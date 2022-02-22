import { notion_types } from "@types";
import React from "react";
import style from "./Code.module.scss";
// import SyntaxHighlighter, {
//   registerLanguage,
// } from "react-syntax-highlighter/dist/esm/light";

// Syntaxhighlighter
import Light from "react-syntax-highlighter/dist/esm/light";
import darcula from "react-syntax-highlighter/dist/esm/styles/hljs/dracula";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends notion_types.CodeItem {}

// COMPONENT

Light.registerLanguage("javascript", js);
Light.registerLanguage("python", python);

const Code = (props: Props) => {
  const { code } = props;

  return (
    <Light
      className={style.container}
      showLineNumbers={true}
      language={code.language}
      style={darcula}
    >
      {code.text.map((it) => it.plain_text).join("")}
    </Light>
  );
};

export default Code;
