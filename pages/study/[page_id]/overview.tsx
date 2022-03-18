import { app_types } from "@types";
import BlockRenderer from "components/Common/BlockRenderer";
import DetailPageHeader from "components/Common/DetailPageHeader";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import ItemGrid from "components/Common/ItemGrid";
import MetaHead from "components/Common/MetaHead";
import PaddingContainer from "components/Common/PaddingContainer";
import StudyInfoItem from "components/Common/StudyInfoItem";
import StudyStatusTag from "components/Common/StudyStatusTag";
import { getPageBlocks } from "lib/server/get-page-blocks";
import { getStudyOpenGraphImageURL } from "lib/server/opengraph";
import { API_GetProcessedPostPageListByStudy } from "lib/server/post-page";
import { API_GetStudyPage } from "lib/server/study-page";
import { useRouter } from "next/router";
import React from "react";
import style from "./overview.module.scss";
import moment from "moment-timezone";
import { ExtendedRecordMap } from "notion-types";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  page: app_types.ProcessedPageWithStudy;
  blocks: ExtendedRecordMap;
  lastFetch: string;
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
  ogImageUrl: string;
}

// COMPONENT

const Overview = (props: Props) => {
  const { page, blocks, lastFetch, postList } = props;

  const router = useRouter();

  if (router.isFallback) {
    return <DetailPageSkeleton />;
  }

  return (
    <PaddingContainer>
      <MetaHead
        title={page.study_name}
        description={page.study_introduce}
        thumbnail={props.ogImageUrl || page.udemy_lecture_thumbnail_url}
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
            {/* <StudyInfoItem {...page} /> */}
            <BlockRenderer
              pageId={page.id}
              blocks={blocks}
              lastFetch={lastFetch}
            />
          </section>
          <section className={style.post_wrapper}>
            <h3>스터디 포스트</h3>
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

  const [page, blocks, postList] = await Promise.all([
    API_GetStudyPage(page_id),
    getPageBlocks(page_id),
    API_GetProcessedPostPageListByStudy(page_id),
  ]);

  if (page.study_status in ["OPEN", "READY"]) {
    return {
      redirect: { destination: `/study/${page_id}/recruit` },
    };
  }
  const lastFetch = moment().tz("Asia/Seoul").toString();

  const ogPath = `url=pming/study&mentor_name=${page.mentor_name}&title=${page.study_name}&mentor_profile_image=${page.mentor_profile_image_url}&type=study`;
  const ogImageUrl = getStudyOpenGraphImageURL(ogPath);

  return {
    props: {
      page: page,
      blocks: blocks,
      lastFetch: lastFetch,
      postList: postList.map((it) => ({ ...it, related_study: page })),
      ogImageUrl,
    },
    revalidate: 1,
  };
};
