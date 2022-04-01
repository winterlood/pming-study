import { app_types } from "@types";
import DetailPageHeader from "components/Common/DetailPageHeader";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import MetaHead from "components/Common/MetaHead";
import PaddingContainer from "components/Common/PaddingContainer";
import StudyStatusTag from "components/Common/StudyStatusTag";
import { getStudyOpenGraphImageURL } from "lib/server/opengraph";
import { API_GetProcessedPostPageListByStudy } from "lib/server/post-page";
import { API_GetStudyPage } from "lib/server/study-page";
import { useRouter } from "next/router";
import React from "react";
import style from "./overview.module.scss";
import PostItemList from "components/Common/PostItemList";
import MentorSummaryBox from "components/Common/MentorSummaryBox";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  page: app_types.ProcessedPageWithStudy;
  lastFetch: string;
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
  ogImageUrl: string;
}

// COMPONENT

const Overview = (props: Props) => {
  const { page, lastFetch, postList } = props;

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
            footerChildren={
              <div className={style.footer_wrapper}>
                <section>
                  <div>{page.study_introduce}</div>
                </section>
                <section>
                  <div className={style.mentor_label}>스터디 멘토</div>
                  <MentorSummaryBox
                    mentor_name={page.mentor_name}
                    mentor_introduce={page.mentor_introduce}
                    mentor_profile_image_url={page.mentor_profile_image_url}
                  />
                </section>
              </div>
            }
          />
        </div>
        <div className={style.main}>
          <section className={style.post_wrapper}>
            <h3>스터디 포스트</h3>
            <PostItemList postList={postList} />
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

  const ogPath = `url=pming/study&mentor_name=${page.mentor_name}&title=${page.study_name}&mentor_profile_image=${page.mentor_profile_image_url}&type=study`;
  const ogImageUrl = getStudyOpenGraphImageURL(ogPath);

  return {
    props: {
      page: page,
      postList: postList.map((it) => ({ ...it, related_study: page })),
      ogImageUrl,
    },
    revalidate: 30,
  };
};
