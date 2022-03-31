import BlockRenderer from "components/Common/BlockRenderer";
import DetailPageSkeleton from "components/Common/DetailPageSkeleton";
import PaddingContainer from "components/Common/PaddingContainer";
import { getPageBlocks } from "lib/server/get-page-blocks";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { ExtendedRecordMap } from "notion-types";
import { getBlockTitle, getPageBreadcrumbs } from "notion-utils";

interface Props {
  pageId: string;
  recordMap: ExtendedRecordMap;
  lastFetch: string;
}
const Guide = (props: Props) => {
  const { pageId, recordMap, lastFetch } = props;

  const router = useRouter();
  if (router.isFallback) {
    return <DetailPageSkeleton />;
  }
  const keys = Object.keys(recordMap?.block || {});
  const block = recordMap?.block?.[keys[0]]?.value;
  const title = getBlockTitle(block, recordMap);
  return (
    <PaddingContainer>
      <h2>{title}</h2>
      <BlockRenderer pageId={pageId} blocks={recordMap} lastFetch={lastFetch} />
    </PaddingContainer>
  );
};
export default Guide;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = async (ctx) => {
  const { page_id } = ctx.params;
  const lastFetch = moment().tz("Asia/Seoul").toString();
  const recordMap = await getPageBlocks(page_id);
  return {
    props: {
      pageId: page_id,
      recordMap,
      lastFetch,
    },
    revalidate: 1440,
  };
};
