import React, { useCallback, useState } from "react";
import style from "./index.module.scss";
import PaddingContainer from "components/Common/PaddingContainer";
import { API_GetProcessedPostPageList } from "lib/server/post-page";
import { API_GetStartedStudyPageList } from "lib/server/study-page";
import { app_types } from "@types";
import { Tabs } from "antd";
import DetailPageHeader from "components/Common/DetailPageHeader";
import MetaHead from "components/Common/MetaHead";
import StudyItemList from "components/Common/StudyItemList";
import PostItemList from "components/Common/PostItemList";
// TYPES

interface Props {
  studyList: app_types.ProcessedPageWithStudy[];
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

const Index = (props: Props) => {
  const [pageFilter, setPageFilter] = useState<"study" | "total">("total");
  const onChangeFilter = useCallback((v) => {
    setPageFilter(v);
  }, []);
  return (
    <PaddingContainer>
      <MetaHead
        title={"모든 포스트"}
        description={"프밍 스터디의 모든 포스트 모아보기"}
      />
      <div className={style.container}>
        <DetailPageHeader
          noBorder
          title={"스터디 포스트"}
          footerChildren={
            <Tabs activeKey={pageFilter} onChange={onChangeFilter}>
              <Tabs.TabPane tab="전체보기" key="total"></Tabs.TabPane>
              <Tabs.TabPane tab="스터디별로 보기" key="study"></Tabs.TabPane>
            </Tabs>
          }
        />
        <div className={style.body}>
          <article className={style.article_wrapper}>
            {pageFilter === "study" ? (
              <StudyItemList
                tag_kind="STUDY_STATUS"
                studyList={props.studyList}
              />
            ) : (
              <PostItemList postList={props.postList} />
            )}
          </article>
        </div>
        <div className={style.footer}></div>
      </div>
    </PaddingContainer>
  );
};

export default Index;

export const getStaticProps = async () => {
  const [studyList, rawPostList] = await Promise.all([
    API_GetStartedStudyPageList(),
    API_GetProcessedPostPageList(),
  ]);

  const postList = rawPostList
    .filter(
      (studyPost) => studyPost.properties.related_study.relation.length > 0
    )
    .map((studyPost) => {
      const targetStudyId = studyPost.properties.related_study.relation[0].id;
      const relatedStudy = studyList.find((it) => it.id === targetStudyId);

      const processedStudyPost = {
        ...studyPost,
        related_study: relatedStudy,
      };

      return processedStudyPost;
    });

  return {
    props: {
      studyList,
      postList,
    },
    revalidate: 1,
  };
};
