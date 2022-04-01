import { app_types } from "@types";
import React from "react";
import style from "./Post.module.scss";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Link from "next/link";

import { API_GetProcessedPostPage } from "lib/server/post-page";
import { getStudyOpenGraphImageURL } from "lib/server/opengraph";
import StudyInfoItem from "components/Common/StudyInfoItem";
import MetaHead from "components/Common/MetaHead";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import PaddingContainer from "components/Common/PaddingContainer";
import { getPageBlocks } from "lib/server/get-page-blocks";
import { ExtendedRecordMap } from "notion-types";
import BlockRenderer from "components/Common/BlockRenderer";
import moment from "moment-timezone";
import { pingSearchConsole } from "lib/server/ping-search-console";
import MentorSummaryBox from "components/Common/MentorSummaryBox";
import CTABanner from "components/Common/CTABanner";
// LAZY
const Comments = dynamic(() => import("components/Common/Comment"), {
  ssr: false,
});

// TYPES

type Props = {
  page: app_types.ProcessedPageWithStudyPostWithRelatedStudy;
  blocks: ExtendedRecordMap;
  lastFetch: string;
  ogImageUrl: string;
};

// COMPONENT

const Post = (props: Props) => {
  const { page, lastFetch, blocks, ogImageUrl } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <DetailPageSkeleton />;
  } else {
    return (
      <div className={style.container}>
        <MetaHead
          title={page.post_title}
          description={page.related_study.study_introduce}
          thumbnail={ogImageUrl}
        />
        <PaddingContainer>
          <div className={style.header}>
            <div className={style.title_wrapper}>
              스터디 포스트 {">"} &nbsp;
              <Link href={`/study/${page.related_study.id}/overview`}>
                <a>{page.related_study.study_name}</a>
              </Link>
              <h1>{page.post_title}</h1>
            </div>

            <div className={style.meta_wrapper}>
              <div className={style.time_wrapper}>
                <div>{new Date(page.created_time).toLocaleString()} 작성</div>
                <div>{new Date(page.created_time).toLocaleString()} 수정</div>
              </div>
            </div>
            <MentorSummaryBox
              mentor_name={page.related_study.mentor_name}
              mentor_introduce={page.related_study.mentor_introduce}
              mentor_profile_image_url={
                page.related_study.mentor_profile_image_url
              }
            />
          </div>
          <div className={style.cover_wrapper}></div>

          <div className={style.article_wrapper}>
            <BlockRenderer
              pageId={page.id}
              blocks={blocks}
              lastFetch={lastFetch}
            />
          </div>

          <div className={style.banner_wrapper}>
            <CTABanner />
          </div>

          <div className={style.comment_wrapper}>
            <Comments />
          </div>

          <div className={style.related_post_wrapper}>
            <div className={style.head}>
              이 포스트는
              <br />
              <Link href={`/study/${page.related_study.id}/overview`} passHref>
                <a>
                  {'"'}
                  {page.related_study.study_name}
                  {'"'}
                </a>
              </Link>
              &nbsp;스터디의 진행 결과입니다
            </div>
            <div className={style.main}>
              <StudyInfoItem {...page.related_study} />
            </div>
          </div>
        </PaddingContainer>
      </div>
    );
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { page_id } = ctx.params;
  const [blocks, page] = await Promise.all([
    getPageBlocks(page_id),
    API_GetProcessedPostPage(page_id),
  ]);
  const lastFetch = moment().tz("Asia/Seoul").toString();
  const ogPath = `url=pming/study&study_name=${page.related_study.study_name}&mentor_name=${page.related_study.mentor_name}&title=${page.post_title}&mentor_profile_image=${page.related_study.mentor_profile_image_url}&type=post`;
  const ogImageUrl = getStudyOpenGraphImageURL(ogPath);
  pingSearchConsole(
    `https://www.google.com/ping?sitemap${process.env.BASE_URL}/post/${page_id}`
  );
  return {
    props: {
      page,
      blocks,
      lastFetch,
      ogImageUrl,
    },
    revalidate: 30,
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
