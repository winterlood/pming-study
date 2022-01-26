import React, { useRef } from "react";
import useScript from "hooks/useScript";

const Comments = () => {
  const comment = useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    theme: "github-light",
    issueTerm: "url",
    repo: "winterlood/udemy-devstu-study-withme",
    ref: comment,
  });

  return <div className="w-full">{<div ref={comment}></div>}</div>;
};

export default Comments;
