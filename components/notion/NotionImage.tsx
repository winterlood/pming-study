import { global_types } from "@types";
import Image from "next/image";
import React from "react";
import style from "./NotionImage.module.scss";
import ModalImage from "react-modal-image";

// ANTD

// COMPS

// STATICS

// TYPES

type Props = global_types.ImageItem;

// COMPONENT

const NotionImage = (props: Props) => {
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
