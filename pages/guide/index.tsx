import BlockRenderer from "components/Common/BlockRenderer";
import PaddingContainer from "components/Common/PaddingContainer";
import { getPageBlocks } from "lib/server/get-page-blocks";
import moment from "moment-timezone";
import { ExtendedRecordMap } from "notion-types";
interface Props {
  pageId: string;
  recordMap: ExtendedRecordMap;
  lastFetch: string;
}
const Guide = (props: Props) => {
  const { pageId, recordMap, lastFetch } = props;
  return (
    <PaddingContainer>
      <BlockRenderer pageId={pageId} blocks={recordMap} lastFetch={lastFetch} />
    </PaddingContainer>
  );
};
export default Guide;

export const getStaticProps = async () => {
  const guidePageId = "3b660121653f4daaa403ef5c2b72a4ac";
  const lastFetch = moment().tz("Asia/Seoul").toString();
  const recordMap = (await getPageBlocks(guidePageId)) as ExtendedRecordMap;

  const blockIds = Object.keys(recordMap.block);
  blockIds.forEach((blockId) => {
    const block = recordMap.block[blockId];
    if (block.value?.type === "page") {
      const source = "guide/" + block.value.id;
      recordMap.block[blockId].value.id = source;
    }
  });

  return {
    props: {
      pageId: guidePageId,
      recordMap,
      lastFetch,
    },
    revalidate: 1440,
  };
};
