import { app_types, notion_types } from "@types";
import React, { useCallback } from "react";
import Comments from "components/Common/Comment";
import PaddingContainer from "components/Common/PaddingContainer";
import { getWholeBlock } from "lib/server/notion";
import style from "./Post.module.scss";
import BlockViewer from "components/Common/BlockViewer";
import {
  API_GetProcessedPostPage,
  API_GetRawPostPage,
} from "lib/server/post-page";
import { useRouter } from "next/router";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import Tag from "components/Common/Tag";
import StripeBanner from "components/Home/StripeBanner";

// TYPES

type Props = {
  page: app_types.ProcessedPageWithStudyPostWithRelatedStudy;
  blocks: notion_types.Block[];
};

// COMPONENT

const Post = (props: Props) => {
  const router = useRouter();
  const { page, blocks } = props;

  const navigateToStudy = () => {
    router.push(`/study/${page.related_study.id}/overview`);
  };

  if (router.isFallback) {
    return <DetailPageSkeleton />;
  }

  return (
    <div className={style.container}>
      <PaddingContainer>
        <div className={style.header}>
          <div className={style.lecture_tag_wapper}>
            <Tag type="primary" onClick={navigateToStudy}>
              {page.related_study.study_name}
            </Tag>
          </div>
          <div className={style.title_wrapper}>
            <h1>{page.post_title}</h1>
          </div>
          <div className={style.meta_wrapper}>
            <div className={style.time_wrapper}>
              <div>작성 : {page.created_time}</div>
              <div>수정 : {page.last_edited_time}</div>
            </div>
          </div>
        </div>
        <div className={style.cover_wrapper}></div>

        <div className={style.article_wrapper}>
          <BlockViewer blocks={blocks} />
        </div>

        <div className={style.banner_wrapper}>
          <StripeBanner
            title="이런 멋진 스터디, 직접 운영하고 싶으신가요?"
            descript="프밍 클래스와 함께 스터디 멘토가 되어보세요!"
            image_url=""
          />
        </div>

        <div className={style.comment_wrapper}>
          <Comments />
        </div>
        {/* 
        <div className={style.related_post_wrapper}>
          <div className={style.head}>이 스터디의 다른 포스트</div>
          <div className={style.main}></div>
        </div> */}
      </PaddingContainer>
    </div>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { page_id } = ctx.params;

  const [rawPage, page, blocks] = await Promise.all([
    API_GetRawPostPage(page_id),
    API_GetProcessedPostPage(page_id),
    getWholeBlock(page_id),
  ]);

  return {
    props: {
      rawPage: rawPage,
      page: page,
      blocks: blocks,
    },
    revalidate: 1,
  };
};

export default Post;

/*
 * LEGACY
 * 모든 page 사전 pre rendering 버전
 */
// export const getStaticPaths = async () => {
//   const pages = await API_GetRawPostPageList();
//   return {
//     paths: pages.map((page) => ({ params: { page_id: page.id } })),
//     fallback: true,
//   };
// };
