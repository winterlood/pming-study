import React, { useCallback, useState } from "react";
import style from "./index.module.scss";
import PaddingContainer from "components/Common/PaddingContainer";
import { API_GetProcessedPostPageList } from "lib/server/post-page";
import { API_GetStartedStudyPageList } from "lib/server/study-page";
import { app_types } from "@types";
import { Tabs } from "antd";
import PostGrid from "components/Post/index/PostGrid";
import DetailPageHeader from "components/Common/DetailPageHeader";
import MetaHead from "components/Common/MetaHead";
// TYPES

interface StudyPostData extends app_types.ProcessedPageWithStudy {
  postList: app_types.ProcessedPageWithStudyPostWithRelatedStudy[];
}

interface Props {
  studyPostData: StudyPostData[];
}

const Index = (props: Props) => {
  const [pageFilter, setPageFilter] = useState<"study" | "total">("study");
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
          title={"스터디 진행 결과 전체보기"}
          footerChildren={
            <Tabs activeKey={pageFilter} onChange={onChangeFilter}>
              <Tabs.TabPane tab="스터디 묶어보기" key="study"></Tabs.TabPane>
              <Tabs.TabPane tab="전체보기" key="total"></Tabs.TabPane>
            </Tabs>
          }
        />
        <div className={style.body}>
          <article className={style.article_wrapper}>
            <PostGrid pageFilter={pageFilter} {...props} />
          </article>
        </div>
        <div className={style.footer}></div>
      </div>
    </PaddingContainer>
  );
};

export default Index;

export const getStaticProps = async () => {
  const [startedStudyList, studyPostList] = await Promise.all([
    API_GetStartedStudyPageList(),
    API_GetProcessedPostPageList(),
  ]);

  const studyPostDataObject = {};

  studyPostList
    .filter(
      (studyPost) => studyPost.properties.related_study.relation.length > 0
    )
    .forEach((studyPost) => {
      const targetStudyId = studyPost.properties.related_study.relation[0].id;
      const relatedStudy = startedStudyList.find(
        (it) => it.id === targetStudyId
      );

      const processedStudyPost = {
        ...studyPost,
        related_study: relatedStudy,
      };

      if (studyPostDataObject[relatedStudy.id]) {
        studyPostDataObject[relatedStudy.id].postList.push(processedStudyPost);
      } else {
        studyPostDataObject[relatedStudy.id] = {
          ...relatedStudy,
          postList: [processedStudyPost],
        };
      }
    });

  return {
    props: {
      studyPostData: Object.values(studyPostDataObject),
      // studyPostList: studyPostWithStudy,
    },
    revalidate: 1,
  };
};
