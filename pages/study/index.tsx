import { app_types } from "@types";
import { Skeleton, Tabs } from "antd";
import CTABanner from "components/Common/CTABanner";
import DetailPageHeader from "components/Common/DetailPageHeader";
import MetaHead from "components/Common/MetaHead";
import PaddingContainer from "components/Common/PaddingContainer";
import StudyItemList from "components/Common/StudyItemList";
import StripeBanner from "components/Home/StripeBanner";
import { API_GetStudyPageList } from "lib/server/study-page";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  studyListByStatus: {
    able: app_types.ProcessedPageWithStudy[];
    inable: app_types.ProcessedPageWithStudy[];
  };
}

// COMPONENT

const { TabPane } = Tabs;

const Index = (props: Props) => {
  const router = useRouter();
  const { studyListByStatus } = props;

  const [filter, setFilter] = useState("able");
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList(() => []);
    if (filter === "all") {
      setItemList([...studyListByStatus.able, ...studyListByStatus.inable]);
    } else {
      setItemList(studyListByStatus[filter]);
    }
  }, [filter, studyListByStatus]);

  const onChangeFilter = useCallback((e) => {
    setFilter(e);
  }, []);

  if (router.isFallback) {
    return (
      <PaddingContainer>
        <MetaHead title="스터디 전체보기" />
        <div className={style.container}>
          <Skeleton
            active
            title={{
              style: {
                height: "50px",
              },
            }}
            paragraph={{
              rows: 1,
              style: {
                height: "30px",
              },
            }}
          />
        </div>
        <main className={style.main}></main>
      </PaddingContainer>
    );
  }

  return (
    <PaddingContainer>
      <MetaHead title="스터디 전체보기" />
      <div className={style.container}>
        <DetailPageHeader
          noBorder
          title={"스터디 전체 보기"}
          footerChildren={
            <Tabs activeKey={filter} onChange={onChangeFilter}>
              <TabPane tab="참여 가능한" key="able"></TabPane>
              <TabPane tab="모집 마감된" key="inable"></TabPane>
              <TabPane tab="전체" key="all"></TabPane>
            </Tabs>
          }
        />
        <main className={style.main}>
          <StudyItemList tag_kind="APPLY_ABLE" studyList={itemList} />
        </main>
        <div className={style.footer}>
          <CTABanner />
        </div>
      </div>
    </PaddingContainer>
  );
};

export default Index;

export const getStaticProps = async () => {
  const studyPageList = await API_GetStudyPageList();

  const studyListByStatus = {
    able: [],
    inable: [],
  };

  studyPageList.forEach((study) => {
    if (["INPROGRESS", "CLOSE"].includes(study.study_status)) {
      studyListByStatus["inable"].push(study);
    } else {
      studyListByStatus["able"].push(study);
    }
  });

  return {
    props: {
      studyListByStatus: studyListByStatus,
    },
    revalidate: 1,
  };
};
