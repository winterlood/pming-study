import { pingSearchConsole } from "lib/server/ping-search-console";
import { API_GetRawPostPageList } from "lib/server/post-page";
import { API_getRawStudyPageList } from "lib/server/study-page";

const Sitemap = () => {};

const url = process.env.BASE_URL;
const baseItem: SitemapItem[] = [
  {
    loc: `${url}/post`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: "1",
  },
  {
    loc: `${url}/study`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: "1",
  },
  {
    loc: `${url}/guide`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: "0.5",
  },
  {
    loc: `${url}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: "1",
  },
];

interface SitemapItem {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}
const genLocItem = (sitemapItem: SitemapItem) => {
  const { loc, lastmod, changefreq, priority } = sitemapItem;
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;
};

export const getServerSideProps = async ({ res }) => {
  const [studyPage, postPage] = await Promise.all([
    API_getRawStudyPageList(),
    API_GetRawPostPageList(),
  ]);
  const dynamicPageLocItem: SitemapItem[] = [];
  dynamicPageLocItem.push(
    ...studyPage.map((it) => {
      const loc = `${url}/study/${it.id}/${
        it.properties.study_status.select.name === "OPEN"
          ? "recruit"
          : "overview"
      }`;
      const lastmod = new Date(it.last_edited_time).toISOString();
      const changefreq = `weekly`;
      const priority = `1.0`;
      return {
        loc,
        lastmod,
        changefreq,
        priority,
      };
    }),
    ...postPage.map((it) => {
      const loc = `${url}/post/${it.id}`;
      const lastmod = new Date(it.last_edited_time).toISOString();
      const changefreq = `weekly`;
      const priority = `1.0`;
      return {
        loc,
        lastmod,
        changefreq,
        priority,
      };
    })
  );
  dynamicPageLocItem.sort((a, b) => {
    if (a.lastmod < b.lastmod) {
      return 1;
    } else if (a.lastmod > b.lastmod) {
      return -1;
    }
    return 0;
  });
  dynamicPageLocItem.push(...baseItem);
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${dynamicPageLocItem.map((it) => genLocItem(it)).join("")}
  </urlset>
  `;
  pingSearchConsole(`https://www.google.com/ping?sitemap=${url}/sitemap.xml`);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
