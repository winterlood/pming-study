import { app_types } from "@types";
import PaddingContainer from "components/Common/PaddingContainer";
import style from "./index.module.scss";
import { API_GetStudyPageList } from "lib/server/study-page";
import { API_GetProcessedPostPageList } from "lib/server/post-page";
import { Button } from "antd";

import banner from "public/image/banner.png";
import MetaHead from "components/Common/MetaHead";
import Link from "next/link";
import StudyItemList from "components/Common/StudyItemList";
import PostItemList from "components/Common/PostItemList";
import CTABanner from "components/Common/CTABanner";

interface Props {
  pages: app_types.PageList;
  studyListByStatus: {
    ready: app_types.ProcessedPageWithStudy[];
    open: app_types.ProcessedPageWithStudy[];
    inprogress: app_types.ProcessedPageWithStudy[];
    close: app_types.ProcessedPageWithStudy[];
  };
  studyPostList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

export default function Home(props: Props) {
  return (
    <div className={style.container}>
      <MetaHead />
      <PaddingContainer>
        <section className={style.section_hero}>
          <div className={style.info_wrapper}>
            <div className={style.descript}>
              Udemy 강의만 구매하면 스터디 참여가 무료?!
              <br />
              스터디원에게는 강의 최저가 할인 쿠폰까지!!
            </div>
            <div className={style.title}>
              함께 해서 더 즐거운
              <br /> 프밍 스터디
            </div>
            <div className={style.btn_wrapper}>
              <Link href={"/study"}>
                <Button type="primary">시작하기</Button>
              </Link>
            </div>
          </div>
          <div className={style.image_wrapper}>
            <img src={banner.src}></img>
          </div>
        </section>
        <section className={style.section_grid}>
          <StudyItemList
            header
            title="신청 가능한 스터디"
            detailPath="/study"
            tag_kind="END_DATE"
            studyList={props.studyListByStatus.open}
          />
        </section>

        <section>
          <CTABanner />
        </section>
      </PaddingContainer>
      <PaddingContainer>
        <section className={style.section_grid}>
          <PostItemList
            header
            title="스터디 포스트"
            detailPath="/post"
            postList={props.studyPostList}
          />
        </section>
        <section className={style.section_grid}>
          <StudyItemList
            header
            title="진행중인 스터디"
            detailPath="/study"
            tag_kind="APPLY_ABLE"
            studyList={props.studyListByStatus.inprogress}
          />
        </section>
      </PaddingContainer>
    </div>
  );
}

export const getStaticProps = async () => {
  const SLICE_COUNT = 6;

  const [studyList, studyPostList] = await Promise.all([
    API_GetStudyPageList(),
    API_GetProcessedPostPageList(),
  ]);

  const studyPostWithStudy = studyPostList
    .filter(
      (studyPost) => studyPost.properties.related_study.relation.length > 0
    )
    .map((studyPost) => {
      const targetStudyId = studyPost.properties.related_study.relation[0].id;
      const relatedStudy = studyList.find((it) => it.id === targetStudyId);
      return {
        ...studyPost,
        related_study: relatedStudy,
      };
    });

  // 스터디 상태별로 분류
  const studyListByStatus = {
    ready: studyList
      .filter((it) => it.study_status === "READY")
      .slice(0, SLICE_COUNT),
    open: studyList
      .filter((it) => it.study_status === "OPEN")
      .slice(0, SLICE_COUNT),
    inprogress: studyList
      .filter((it) => it.study_status === "INPROGRESS")
      .slice(0, SLICE_COUNT),
    close: studyList
      .filter((it) => it.study_status === "CLOSE")
      .slice(0, SLICE_COUNT),
  };

  return {
    props: {
      studyListByStatus: studyListByStatus,
      studyPostList: studyPostWithStudy,
    },
    revalidate: 1,
  };
};
