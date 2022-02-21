import { app_types } from "@types";
import { Tabs } from "antd";
import DetailPageHeader from "components/Common/DetailPageHeader";
import ItemGrid from "components/Common/ItemGrid";
import PaddingContainer from "components/Common/PaddingContainer";
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
    ready: app_types.ProcessedPageWithStudy[];
    open: app_types.ProcessedPageWithStudy[];
    inprogress: app_types.ProcessedPageWithStudy[];
    close: app_types.ProcessedPageWithStudy[];
  };
}

// COMPONENT

const { TabPane } = Tabs;

const Index = (props: Props) => {
  const router = useRouter();
  const { status } = router.query;
  const { studyListByStatus } = props;

  const [filter, setFilter] = useState((status as string) || "all");
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    if (status) {
      setFilter(status as string);
    }
  }, [status]);

  useEffect(() => {
    setItemList(() => []);
    if (filter === "all") {
      setItemList([
        ...studyListByStatus.ready,
        ...studyListByStatus.open,
        ...studyListByStatus.inprogress,
        ...studyListByStatus.close,
      ]);
    } else if (filter === "ready") {
      setItemList(studyListByStatus.ready);
    } else if (filter === "open") {
      setItemList(studyListByStatus.open);
    } else if (filter === "inprogress") {
      setItemList(studyListByStatus.inprogress);
    } else if (filter === "close") {
      setItemList(studyListByStatus.close);
    }
  }, [filter, studyListByStatus]);

  const onChangeFilter = useCallback((e) => {
    setFilter(e);
  }, []);

  return (
    <PaddingContainer>
      <div className={style.container}>
        <DetailPageHeader
          noBorder
          title={"스터디 전체 보기"}
          footerChildren={
            <Tabs activeKey={filter} onChange={onChangeFilter}>
              <TabPane tab="전체" key="all"></TabPane>
              <TabPane tab="준비중인" key="ready"></TabPane>
              <TabPane tab="참가 가능한" key="open"></TabPane>
              <TabPane tab="진행중인" key="inprogress"></TabPane>
              <TabPane tab="종료된" key="close"></TabPane>
            </Tabs>
          }
        />

        <main className={style.main}>
          <ItemGrid
            gridItemType="STUDY"
            title=""
            detailPath={""}
            noHeader={true}
            gridItemList={itemList}
          />
        </main>

        <div className={style.footer}>
          <StripeBanner
            title="찾으시는 스터디가 없다면 직접 멘토가 되어보세요"
            descript="선정된 멘토는 Udemy에서 운영하는 Global Best 강의 무료 수강권 혜택이 있습니다"
            image_url=""
          />
        </div>
      </div>
    </PaddingContainer>
  );
};

export default Index;

export const getServerSideProps = async () => {
  const studyPageList = await API_GetStudyPageList();

  const studyListByStatus = {
    ready: studyPageList.filter((it) => it.study_status === "READY"),
    open: studyPageList.filter((it) => it.study_status === "OPEN"),
    inprogress: studyPageList.filter((it) => it.study_status === "INPROGRESS"),
    close: studyPageList.filter((it) => it.study_status === "CLOSE"),
  };

  return {
    props: {
      studyListByStatus: studyListByStatus,
    },
  };
};
