import { app_types } from "@types";
import LectureItem from "components/Home/LectureItem";
import PaddingContainer from "components/Common/PaddingContainer";
import PageItem from "components/PageItem";
import style from "./index.module.scss";
import ItemGrid from "components/Common/ItemGrid";
import { API_GetStudyPageList } from "lib/server/study-page";
import StripeBanner from "components/Home/StripeBanner";
import { API_GetProcessedPostPageList } from "lib/server/post-page";
import { Button } from "antd";

import banner from "public/image/banner.png";
import MetaHead from "components/Common/MetaHead";

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
              멘토에게는 강의 무료 수강권을
              <br />
              멘티에게는 만원대의 파격적 수강료 지원
            </div>
            <div className={style.title}>
              이제 혼자가 아닌
              <br /> 같이 스터디하세요
            </div>

            <div className={style.btn_wrapper}>
              <Button type="primary">시작하기</Button>
            </div>
          </div>

          <div className={style.image_wrapper}>
            <img src={banner.src}></img>
          </div>
        </section>
        <section className={style.section_grid}>
          <ItemGrid
            title="신청 가능한 스터디"
            detailPath="/study?status=open"
            gridItemType="STUDY"
            gridItemList={props.studyListByStatus.open}
          />
        </section>
        <section className={style.section_grid}>
          <ItemGrid
            title="준비 중인 스터디"
            detailPath="/study?status=ready"
            gridItemType="STUDY"
            gridItemList={props.studyListByStatus.ready}
          />
        </section>
        <section>
          <StripeBanner
            title="멘토는 무료, 멘티는 최저가 수강료 지원"
            descript="선정된 멘토와 멘티에게는 Udemy Global Best 강의료를 지원합니다"
            image_url="https://sb-drops.s3.amazonaws.com/drop/rmopt-602c8a6723dc8-914689400-1613531751.png"
            isExternalPath
            path="https://devstu-udemy.netlify.app/"
          />
        </section>
      </PaddingContainer>

      <PaddingContainer>
        <section className={style.section_grid}>
          <ItemGrid
            title="진행 중인 스터디"
            detailPath="/post"
            gridItemType="POST"
            gridItemList={props.studyPostList}
          />
        </section>
      </PaddingContainer>
    </div>
  );
}

export const getStaticProps = async () => {
  const SLICE_COUNT = 3;

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
