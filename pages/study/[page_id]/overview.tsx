import { app_types } from "@types";
import DetailPageHeader from "components/Common/DetailPageHeader";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import ItemGrid from "components/Common/ItemGrid";
import MetaHead from "components/Common/MetaHead";
import PaddingContainer from "components/Common/PaddingContainer";
import StudyInfoItem from "components/Common/StudyInfoItem";
import StudyStatusTag from "components/Common/StudyStatusTag";
import { API_GetProcessedPostPageListByStudy } from "lib/server/post-page";
import {
  API_GetRawStudyPage,
  API_getRawStudyPageList,
  API_GetStudyPage,
} from "lib/server/study-page";
import { useRouter } from "next/router";
import React from "react";
import style from "./overview.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  page: app_types.ProcessedPageWithStudy;
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

// COMPONENT

const Overview = (props: Props) => {
  const { page, postList } = props;

  const router = useRouter();

  if (router.isFallback) {
    return <DetailPageSkeleton />;
  }

  return (
    <PaddingContainer>
      <MetaHead
        title={page.study_name}
        description={page.study_introduce}
        thumbnail={page.udemy_lecture_thumbnail_url}
      />
      <div className={style.container}>
        <div className={style.head}>
          <DetailPageHeader
            headChildren={<StudyStatusTag studyStatus={page.study_status} />}
            title={page.study_name}
            footerChildren={page.study_introduce}
          />
        </div>
        <div className={style.main}>
          <section className={style.study_info_wrapper}>
            <StudyInfoItem {...page} />
          </section>
          <section className={style.post_wrapper}>
            <ItemGrid
              title=""
              detailPath=""
              noHeader
              gridItemType="POST"
              gridItemList={postList}
            />
          </section>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default Overview;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { page_id } = ctx.params;

  const [page, postList] = await Promise.all([
    API_GetStudyPage(page_id),
    API_GetProcessedPostPageListByStudy(page_id),
  ]);

  if (page.study_status in ["OPEN", "READY"]) {
    return {
      redirect: { destination: `/study/${page_id}/recruit` },
    };
  }

  return {
    props: {
      page: page,
      postList: postList.map((it) => ({ ...it, related_study: page })),
    },
    revalidate: 1,
  };
};
