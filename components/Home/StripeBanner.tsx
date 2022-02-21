import { Button } from "antd";
import PaddingContainer from "components/Common/PaddingContainer";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import style from "./StripeBanner.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  title: string;
  descript: string;
  image_url: string;
  path: string;
  isExternalPath?: boolean;
}

// COMPONENT

const StripeBanner = (props: Props) => {
  const router = useRouter();

  const handleOnClickBtn = useCallback(() => {
    if (props.isExternalPath) {
      window.open(props.path);
    } else {
      router.push(props.path);
    }
  }, [props]);

  return (
    <div className={style.container_outter}>
      <div className={style.container}>
        <div className={style.info_wrapper}>
          <div className={style.title}>{props.title}</div>
          <div className={style.descript}>{props.descript}</div>
          <div className={style.btn_wrapper}>
            <Button onClick={handleOnClickBtn} shape="round">
              더 알아보기
            </Button>
          </div>
        </div>
        <div className={style.img_wrapper}>
          <img src={props.image_url}></img>
        </div>
      </div>
    </div>
  );
};

export default React.memo(StripeBanner);
