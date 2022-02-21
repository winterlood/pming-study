import React, { useCallback, useEffect, useState } from "react";
import style from "./recruit.module.scss";
import PaddingContainer from "components/Common/PaddingContainer";
import { getWholeBlock } from "lib/server/notion";
import BlockViewer from "components/Common/BlockViewer";
import { api_types, app_types, notion_types } from "@types";
import Comments from "components/Common/Comment";
import { API_GetRawStudyPage, API_GetStudyPage } from "lib/server/study-page";
import { getLocaleEndDate } from "lib/client/study";
import ApplyStudyModal from "components/Study/ApplyStudyModal";
import { message, Button, Spin } from "antd";
import { GET_studyApplicant, POST_applyStudy } from "lib/client/api";
import { useRouter } from "next/router";
import StudyStatusTag from "components/Common/StudyStatusTag";
import DetailPageHeader from "components/Common/DetailPageHeader";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";

// TYPES

// COMPONENT

interface Props {
  rawPage: any;
  page: app_types.ProcessedPageWithStudy;
  blocks: notion_types.Block[];
}

const Study = (props: Props) => {
  const { page, blocks } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = useCallback(() => setIsOpen((v) => !v), []);

  const submit = async (
    applyData: Partial<api_types.StudyApplyRequestBody>
  ) => {
    const requestBody: api_types.StudyApplyRequestBody = {
      target_study_id: page.id,
      ...(applyData as api_types.StudyApplyRequestBody),
    };

    await POST_applyStudy({
      requestBody: requestBody,
      onSuccess: () => {
        message.success({
          content: "스터디 신청 완료 ⭐",
          style: {
            marginTop: "20vh",
          },
        });
        toggleModal();
      },
      onFail: (err) => {
        console.log(err);
        message.error({
          content: "스터디 신청에 실패하였습니다 😥",
          style: {
            marginTop: "20vh",
          },
        });
      },
    });
  };

  if (router.isFallback) {
    return <DetailPageSkeleton />;
  }

  if (!page) {
    return <div>PAGE NOT RETURENDED</div>;
  }
  return (
    <div className={style.container}>
      <ApplyStudyModal
        isOpen={isOpen}
        onClose={toggleModal}
        onSubmit={submit}
      />
      <PaddingContainer>
        <DetailPageHeader
          headChildren={
            <div className={style.tag_wrapper}>
              <StudyStatusTag studyStatus={page.study_status}></StudyStatusTag>
              {page.study_status === "OPEN" && (
                <StudyStatusTag studyStatus={page.study_status}>
                  {getLocaleEndDate(page.study_apply_end_date)}
                </StudyStatusTag>
              )}
            </div>
          }
          title={page.study_name}
          footerChildren={
            <div className={style.introduce_wrapper}>
              {page.study_introduce}
            </div>
          }
        />
        <section className={style.info_section}>
          <div className={style.info_item}>
            <span className={style.info_label}>🗓️ 스터디 모집 일정</span>
            <span className={style.info_value}>
              {page.study_start_date} ~ {page.study_apply_end_date}
            </span>
          </div>
          <div className={style.info_item}>
            <span className={style.info_label}>🚨 스터디 대상 강의</span>
            <span className={style.info_value}>{page.udemy_lecture_name}</span>
          </div>
          <div className={style.info_item}>
            <span className={style.info_label}>🧑‍🏫 스터디 정원</span>
            <span className={style.info_value}>
              {page.study_max_member_count}명
            </span>
          </div>
          <div className={style.info_item}>
            <span className={style.info_label}>🙋‍♂️ 현재 신청자</span>
            <span className={style.info_value}>{page.apply_count} 명</span>
          </div>
        </section>
        <section className={style.lecture_info_section}>
          <h3>🌏 스터디와 함께 진행되는 강의</h3>
          <div className={style.lecture_info_main}>
            <a target={"_blank"} rel="noreferrer" href={page.udemy_lecture_url}>
              <img src={page.udemy_lecture_thumbnail_url} />
            </a>
            <div>
              <div>{page.udemy_lecture_name}</div>
              <div>{page.udemy_lecture_url}</div>
            </div>
          </div>
        </section>
        <section className={style.article_section}>
          <BlockViewer blocks={blocks} />
        </section>

        {page.study_status === "OPEN" && (
          <section className={style.apply_btn_wrapper}>
            <Button
              onClick={toggleModal}
              type={"primary"}
              size={"large"}
              shape={"round"}
            >
              스터디 참가 신청하기
            </Button>
          </section>
        )}
        <Comments />
      </PaddingContainer>
    </div>
  );
};

export default Study;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (ctx) => {
  const { page_id } = ctx.params;

  const [rawPage, page, blocks] = await Promise.all([
    API_GetRawStudyPage(page_id),
    API_GetStudyPage(page_id),
    getWholeBlock(page_id),
  ]);

  if (page.study_status in ["INPROGRESS", "CLOSE"]) {
    return {
      redirect: { destination: `/study/${page_id}/overview` },
    };
  }

  return {
    props: {
      rawPage: rawPage,
      page: page,
      blocks: blocks,
    },
    revalidate: 1,
  };
};

/*
 * LEGACY
 * 모든 page 사전 pre rendering 버전
 */
// export const getStaticPaths = async () => {
//   const pages = await API_getRawStudyPageList();
//   return {
//     paths: pages.map((page) => ({ params: { page_id: page.id } })),
//     fallback: true,
//   };
// };
