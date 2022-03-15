import { app_types, notion_types } from "@types";
import React, { useEffect } from "react";
import style from "./Post.module.scss";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import Link from "next/link";

import { API_GetProcessedPostPage } from "lib/server/post-page";
import { getStudyOpenGraphImageURL } from "lib/server/opengraph";
import { getWholeBlock } from "lib/server/notion";

import BlockViewer from "components/Common/BlockViewer";
import StudyInfoItem from "components/Common/StudyInfoItem";
import MetaHead from "components/Common/MetaHead";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import Tag from "components/Common/Tag";
import StripeBanner from "components/Home/StripeBanner";
import PaddingContainer from "components/Common/PaddingContainer";

import moment from "moment-timezone";

// LAZY
const Comments = dynamic(() => import("components/Common/Comment"), {
  ssr: false,
});

// TYPES

type Props = {
  page: app_types.ProcessedPageWithStudyPostWithRelatedStudy;
  blocks: notion_types.Block[];
  ogImageUrl: string;
  lastFetch: string;
};

// COMPONENT

const Post = (props: Props) => {
  const { page, blocks, ogImageUrl, lastFetch } = props;
  const router = useRouter();

  const navigateToStudy = () => {
    router.push(`/study/${page.related_study.id}/overview`);
  };

  useEffect(() => {
    if (!router.isFallback) {
      console.log(router.isFallback);
      const serverMoment = moment(lastFetch).tz("Asia/Seoul");
      const clientMoment = moment().tz("Asia/Seoul");
      const minuteDiff = clientMoment.diff(serverMoment, "minutes");
      console.log(`last update before ${minuteDiff} minutes`);
      if (minuteDiff >= 60) {
        router.replace(router.asPath);
      } else {
        console.log("not refresh page");
      }
    }
  }, [lastFetch, router, router.isFallback]);

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
        <button
          onClick={() => {
            router.replace(router.asPath);
          }}
        >
          button
        </button>
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
              isExternalPath={true}
              path="https://devstu-udemy.netlify.app/"
            />
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

  const [page, blocks] = await Promise.all([
    API_GetProcessedPostPage(page_id),
    getWholeBlock(page_id),
  ]);

  const lastFetch = moment().tz("Asia/Seoul").toString();

  const ogPath = `url=pming/study&study_name=${page.related_study.study_name}&mentor_name=${page.related_study.mentor_name}&title=${page.post_title}&mentor_profile_image=${page.related_study.mentor_profile_image_url}&type=post`;
  const ogImageUrl = getStudyOpenGraphImageURL(ogPath);

  return {
    props: {
      page: page,
      blocks: blocks,
      ogImageUrl: ogImageUrl,
      lastFetch: lastFetch,
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
