import { global_types } from "@types";
import Head from "next/head";
import Image from "next/image";
import PageItem from "../components/PageItem";
import { getDatabase, getPagesFromDatabase } from "../lib/notion";
import style from "./index.module.scss";

interface Props {
  pages: global_types.PageList;
}

export default function Home({ pages }: Props) {
  return (
    <div className={style.container}>
      <div className={style.page_wrapper}>
        {pages.map((it) => (
          <PageItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const databaseId = process.env.NOTION_DATABASE;
  const pages = await getPagesFromDatabase(databaseId);
  return {
    props: {
      pages,
    },
    revalidate: 1,
  };
};
