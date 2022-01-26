import { global_types } from "@types";
import Image from "next/image";
import React from "react";
import style from "./NotionImage.module.scss";
import ModalImage from "react-modal-image";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props extends global_types.ImageItem {}

// COMPONENT

const NotionImage = (props: Props) => {
  const captionString = props.image.caption
    .map((it) => it.plain_text)
    .join(" ");
  return (
    <div className={style.container}>
      <ModalImage
        hideDownload={true}
        alt={captionString}
        className={style.img}
        small={props.image.file.url}
        large={props.image.file.url}
      />
      <div className={style.caption}>{captionString}</div>
    </div>
  );
};

export default NotionImage;
