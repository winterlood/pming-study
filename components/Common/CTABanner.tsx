import style from "./CTABanner.module.scss";
import { Button } from "antd";
import Link from "next/link";

const CTA_URL = "https://opondv6pe5s.typeform.com/to/LDA9UDTL";
const CTABanner = () => {
  return (
    <div className={style.container_outter}>
      <div className={style.container}>
        <div className={style.info_wrapper}>
          <div className={style.title}>
            원하는 스터디가 없다면? 다른 스터디 개설 신청하기
          </div>
          <div className={style.descript}>
            누군가 아직 원하는 스터디를 개설하지 않았나요? 여러분이 직접 개설
            신청 해 주세요!
          </div>
          <div className={style.btn_wrapper}>
            <Link href={CTA_URL}>
              <Button shape="round">스터디 개설 신청하기</Button>
            </Link>
          </div>
        </div>
        <div className={style.img_wrapper}>
          {/* <img src={props.image_url}></img> */}
        </div>
      </div>
    </div>
  );
};
export default CTABanner;
