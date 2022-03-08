import { notion_types } from "@types";
import React from "react";
import style from "./NotionImage.module.scss";
import ModalImage from "react-modal-image";

// ANTD

// COMPS

// STATICS

// TYPES

type Props = notion_types.ImageItem;

// COMPONENT

const NotionImage = (props: Props) => {
  var date = new Date();
  const iso = date.toISOString(); //"2011-12-19T15:28:46.493Z"

  console.log(
    iso.replaceAll("-", "").replaceAll(":", "").split(".")[0].concat("Z")
  );

  let imageUrl = "";
  if (props.image.type === "external") {
    imageUrl = props.image.external.url;
  } else {
    imageUrl = props.image.file.url;
  }

  const captionString = props.image.caption
    .map((it) => it.plain_text)
    .join(" ");

  return (
    <div className={style.container}>
      <ModalImage
        hideDownload={true}
        alt={captionString}
        className={style.img}
        small={imageUrl}
        large={imageUrl}
      />
      <div className={style.caption}>{captionString}</div>
    </div>
  );
};

export default NotionImage;
