import React from "react";
import style from "./Footer.module.scss";
import { Button } from "antd";
import PaddingContainer from "./PaddingContainer";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {}

// COMPONENT

const Footer = (props: Props) => {
  return (
    <footer className={style.container}>
      <PaddingContainer>
        <div className={style.container_inner}>
          <div className={style.brand_wrapper}>
            <div className={style.logo}>DEVMATE</div>
            <div className={style.descript}>
              DEMATE는 대한민국 개발자 커뮤니티 DEVSTU와 Udemy의 글로벌 공식
              파트너 웅진씽크빅과 함께하는 강의형 스터디 플랫폼입니다.
            </div>
          </div>
          <div className={style.info_wrapper}>
            <div className={[style.host_wrapper, style.item_section].join(" ")}>
              <div className={style.head}>주관사</div>
              <div className={style.child_wrapper}>
                <div className={style.value}>DEVSTU</div>
                <div className={style.value}>Udemy Korea</div>
              </div>
            </div>
            <div className={[style.host_wrapper, style.item_section].join(" ")}>
              <div className={style.head}>고객센터</div>
              <div className={style.child_wrapper}>
                <div className={style.value}>개인정보 처리방침</div>
                <div className={style.value}>이용약관</div>
              </div>
              <div className={style.customer_center_wrapper}>
                <Button>문의하기</Button>
                <div className={style.button_descript}>
                  오전 10시 ~ 오후 4시 30분 (주말, 공휴일 제외)
                </div>
              </div>
            </div>
          </div>
        </div>
      </PaddingContainer>
    </footer>
  );
};

export default Footer;
