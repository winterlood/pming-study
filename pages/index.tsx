import { global_types } from "@types";
import LectureItem from "components/Home/LectureItem";
import MainLayout from "components/MainLayout";
import PageItem from "../components/PageItem";
import { getLecture, getPagesFromDatabase } from "../lib/server/notion";
import style from "./index.module.scss";

interface Props {
  pages: global_types.PageList;
  lectures: global_types.ProcessedLectureItem[];
}

export default function Home(props: Props) {
  const { pages, lectures } = props;
  console.log(props);
  return (
    <div className={style.container}>
      <section className={style.section_hero}>
        <div
          className={style.bg}
          style={{
            backgroundImage: `url(https://www.udemykorea.com/image/home/gx/xm/hnoqqshp/bannerImage/64680595scjq.jpg)`,
          }}
        ></div>
      </section>

      <MainLayout>
        <section className={style.section_leture}>
          <div className={style.section_header}>
            <h3>참가 가능한 챌린지</h3>
          </div>
          <div className={style.lecture_grid}>
            {lectures.map((it) => (
              <LectureItem key={it.id} {...it} />
            ))}
          </div>
        </section>

        <section className={style.section_leture}>
          <div className={style.section_header}>
            <h3>챌린지 결과</h3>
          </div>
          <div className={style.lecture_grid}>
            {pages.map((it) => (
              <PageItem key={it.id} {...it} />
            ))}
          </div>
        </section>
      </MainLayout>
    </div>
  );
}

export const getStaticProps = async () => {
  const pages = await getPagesFromDatabase();
  const lectures = await getLecture();
  return {
    props: {
      pages,
      lectures,
    },
    revalidate: 1,
  };
};
