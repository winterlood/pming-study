import style from "./BlockRendere.module.scss";

import { NotionRenderer, Code } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "rc-dropdown/assets/index.css";
import "katex/dist/katex.min.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_pageBlocks } from "lib/client/api";
import moment from "moment-timezone";

interface Props {
  pageId: string;
  blocks: ExtendedRecordMap;
  lastFetch: string;
  fullPage?: boolean;
}

const BlockRenderer = (props: Props) => {
  const { pageId, blocks, lastFetch } = props;
  const router = useRouter();

  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | undefined>();

  const isOutdated = () => {
    const serverMoment = moment(lastFetch).tz("Asia/Seoul");
    const clientMoment = moment().tz("Asia/Seoul");
    const minuteDiff = clientMoment.diff(serverMoment, "minutes");
    console.log(`last update before ${minuteDiff} minutes`);
    if (minuteDiff >= 60) {
      return true;
    } else {
      return false;
    }
  };

  const getPageBlock = () => {
    GET_pageBlocks({
      page_id: pageId,
      onSuccess: (res) => {
        setRecordMap(res.data);
      },
      onFail: () => {},
    });
  };

  useEffect(() => {
    if (!router.isFallback && isOutdated()) {
      getPageBlock();
    }
  }, []);

  return (
    <article className={style.container}>
      <NotionRenderer
        fullPage={props.fullPage}
        components={{
          code: Code,
        }}
        recordMap={recordMap !== undefined ? recordMap : blocks}
      />
    </article>
  );
};

export default BlockRenderer;
