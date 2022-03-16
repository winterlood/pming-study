import React, { useCallback, useEffect, useState } from "react";
import style from "./recruit.module.scss";
import { api_types, app_types, notion_types } from "@types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { message, Button } from "antd";

// COMPONENTS
import PaddingContainer from "components/Common/PaddingContainer";
import StudyStatusTag from "components/Common/StudyStatusTag";
import DetailPageHeader from "components/Common/DetailPageHeader";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import MetaHead from "components/Common/MetaHead";

// IMPORT LIBS
import { GET_pageBlocks, POST_applyStudy } from "lib/client/api";
import { getLocaleEndDate } from "lib/client/study";
import { API_GetStudyPage } from "lib/server/study-page";
import { getStudyOpenGraphImageURL } from "lib/server/opengraph";
import Section from "components/Study/Section";
import { ExtendedRecordMap } from "notion-types";

import { getPageBlocks } from "lib/server/get-page-blocks";
import moment from "moment-timezone";
import { pingSearchConsole } from "lib/server/ping-search-console";
import BlockRenderer from "components/Common/BlockRenderer";

// LAZY
const ApplyStudyDrawer = dynamic(
  () => import("components/Study/ApplyStudyDrawer"),
  { ssr: false }
);

const Comments = dynamic(() => import("components/Common/Comment"), {
  ssr: false,
});

// COMPONENT

interface Props {
  page: app_types.ProcessedPageWithStudy;
  blocks: ExtendedRecordMap;
  ogImageUrl: string;
  lastFetch: string;
}

const Study = (props: Props) => {
  const { page, blocks, lastFetch } = props;
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
      onFail: () => {
        message.error({
          content: "스터디 신청에 실패하였습니다 😥",
          style: {
            marginTop: "20vh",
          },
        });
        toggleModal();
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
      <MetaHead
        title={page.study_name}
        description={page.study_introduce}
        thumbnail={props.ogImageUrl || page.udemy_lecture_thumbnail_url}
      />
      <ApplyStudyDrawer
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
        <Section className={style.info_section} title={"🎯 스터디 요약"}>
          <div className={style.info_item_wrapper}>
            <div className={style.info_item}>
              <span className={style.info_label}>스터디 대상 강의</span>
              <span className={style.info_value}>
                {page.udemy_lecture_name}
              </span>
            </div>
            <div className={style.info_item}>
              <span className={style.info_label}>스터디 모집 일정</span>
              <span className={style.info_value}>
                {page.study_apply_end_date} 까지
              </span>
            </div>
            <div className={style.info_item}>
              <span className={style.info_label}>스터디 정원</span>
              <span className={style.info_value}>
                {page.study_max_member_count}명
              </span>
            </div>
          </div>
        </Section>

        <Section
          className={style.lecture_info_section}
          title={"🌏 스터디 할 강의를 소개합니다"}
        >
          <div className={style.lecture_info_main}>
            <a target={"_blank"} rel="noreferrer" href={page.udemy_lecture_url}>
              <img
                src={page.udemy_lecture_thumbnail_url}
                alt={page.udemy_lecture_name}
              />
            </a>
            <div className={style.lecture_title}>
              <h4>Udemy - {page.udemy_lecture_name}</h4>
              <div className={style.lecture_mentee_special}>
                * 프밍 스터디 멘티에게는 최저가 (만원대 가격)으로 강의를
                제공합니다
              </div>
            </div>
            <div className={style.lecture_view_more}>
              <a
                href={page.udemy_lecture_url}
                target={"_blank"}
                rel="noreferrer"
              >
                강의 자세히 보기 {">"}
              </a>
            </div>
          </div>
        </Section>

        <Section className={style.article_section}>
          <BlockRenderer
            pageId={page.id}
            blocks={blocks}
            lastFetch={lastFetch}
          />
        </Section>

        <Section
          className={style.notice_section}
          title={"🚩 프밍 스터디 기본 진행 방식"}
        >
          <div className={style.notice_item_wrapper}>
            <div className={style.notice_item}>
              <div className={style.notice_head}>1. 스터디 신청하기</div>
              <div className={style.notice_value}>
                <div className={style.notice_paragraph}>
                  페이지 맨 아래에 있는 스터디 신청하기 버튼을 눌러 나타나는
                  스터디 신청 폼을 통해 스터디를 신청합니다
                </div>
                <div className={style.notice_paragraph}>
                  정원 이상의 신청자가 발생할 경우 멘토가 신청서에 기입해주신
                  정보를 토대로 정원 내로 스터디 멘티를 선정합니다.
                </div>
              </div>
            </div>
            <div className={style.notice_item}>
              <div className={style.notice_head}>2. 선정된 스터디원 발표</div>
              <div className={style.notice_value}>
                <div className={style.notice_paragraph}>
                  스터디 멘토는 지원 기간이 마감되면, 정원 내에서 스터디 멘티를
                  선정합니다.
                </div>
                <div className={style.notice_paragraph}>
                  선정된 스터디 멘티 분들에게 프밍이 별도로 연락을 드려요!{" "}
                </div>
                <div className={style.notice_paragraph}>
                  아쉽게 선정되지 않은 분들 께도 연락을 드립니다
                </div>
              </div>
            </div>
            <div className={style.notice_item}>
              <div className={style.notice_head}>3. 보증금 (매우 중요)</div>
              <div className={style.notice_value}>
                <div className={style.notice_paragraph}>
                  스터디의 원활한 운영과 무분별한 불참 및 탈주 방지를 위해
                  최소한의 보증금 제를 운영하고 있습니다.
                </div>
                <div className={style.notice_paragraph}>
                  모든 스터디 멘티는 스터디에 참가하기 위해 15,000원의 스터디
                  보증금이 필요합니다
                </div>
                <div className={style.notice_paragraph}>
                  보증금은 프밍 측에서 직접 보관하고 있다가, 스터디가 종료되면
                  돌려드립니다
                </div>
                <div
                  className={[style.notice_paragraph, style.notice_warn].join(
                    " "
                  )}
                >
                  사유 없이 스터디에 무단으로 불참 하는 등의 스터디 문화를
                  방해하는 행위를 한 멘티에게는 보증금 지급이 어려울 수
                  있습니다.
                </div>
              </div>
            </div>
            <div className={style.notice_item}>
              <div className={style.notice_head}>4. 스터디 진행</div>
              <div className={style.notice_value}>
                <div className={style.notice_paragraph}>
                  보증금은 프밍 측에서 직접 보관하고 있다가, 스터디가 종료되면
                  돌려드립니다
                </div>
                <div className={style.notice_paragraph}>
                  1~3 단계를 마친 멘티분들과 멘토님이 함께 스터디를 본격적으로
                  진행합니다.
                </div>
                <div className={style.notice_paragraph}>
                  모든 스터디의 진행은 멘토를 중심으로 한 스터디 구성원
                  자율적으로 운영됩니다.(자세한 스터디 진행 방식은 아래 멘토님이
                  직접 작성 해 놓으신 내용을 참고 해 주세요)
                </div>
                <div className={style.notice_paragraph}>
                  단 1주에 최소 한개 이상의 학습 노트를 작성하셔야 합니다.
                </div>
              </div>
            </div>
            <div className={style.notice_item}>
              <div className={style.notice_head}>5. 스터디 종료</div>
              <div className={style.notice_value}>
                <div className={style.notice_paragraph}>
                  스터디가 종료되면 스터디를 완주하신 분들에 한하여 보증금을
                  돌려드립니다.
                </div>
                <div
                  className={[style.notice_paragraph, style.notice_impact].join(
                    " "
                  )}
                >
                  * 멘토님들에게는 리워드를 제공합니다
                </div>
              </div>
            </div>
          </div>
        </Section>
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

  const [blocks, page] = await Promise.all([
    getPageBlocks(page_id),
    API_GetStudyPage(page_id),
  ]);

  if (page.study_status in ["INPROGRESS", "CLOSE"]) {
    return {
      redirect: { destination: `/study/${page_id}/overview` },
    };
  }

  const ogPath = `url=pming/study&mentor_name=${page.mentor_name}&title=${page.study_name}&mentor_profile_image=${page.mentor_profile_image_url}&type=study`;
  const ogImageUrl = getStudyOpenGraphImageURL(ogPath);
  const lastFetch = moment().tz("Asia/Seoul").toString();

  pingSearchConsole(
    `https://www.google.com/ping?sitemap${
      process.env.BASE_URL
    }/study/${page_id}/${page.study_status === "OPEN" ? "recruit" : "overview"}`
  );
  return {
    props: {
      page,
      blocks,
      lastFetch,
      ogImageUrl,
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
