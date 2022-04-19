/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// const isLocal = process.env.NODE_ENV === "development";
const isLocal = false;

const nextConfig = {
  env: {
    /*
     * PROJECTS CONFIGS
     */
    BASE_URL: isLocal
      ? process.env.BASE_URL_LOCAL
      : process.env.BASE_URL_PRODUCTION,

    OG_GENERATOR_URL: isLocal
      ? process.env.OG_GENERATOR_URL_LOCAL
      : process.env.OG_GENERATOR_URL_PRODUCTION,

    /*
     * INTEGRATION KEYS
     */
    NOTION_SERVER_SIDE_READ_ACCESS_TOKEN: isLocal
      ? process.env.TEST_NOTION_SERVER_SIDE_READ_ACCESS_TOKEN
      : process.env.PRODUCTION_NOTION_SERVER_SIDE_READ_ACCESS_TOKEN,

    NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN: isLocal
      ? process.env.TEST_NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN
      : process.env.PRODUCTION_NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN,

    NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN: isLocal
      ? process.env.TEST_NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN
      : process.env.PRODUCTION_NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN,

    /*
     * PAGE & DATABASES
     */
    NOTION_INDEX_PAGE: isLocal
      ? process.env.TEST_NOTION_INDEX_PAGE
      : process.env.PRODUCTION_NOTION_INDEX_PAGE,

    NOTION_STUDY_DATABASE: isLocal
      ? process.env.TEST_NOTION_STUDY_DATABASE
      : process.env.PRODUCTION_NOTION_STUDY_DATABASE,

    NOTION_STUDY_POST_DATABASE: isLocal
      ? process.env.TEST_NOTION_STUDY_POST_DATABASE
      : process.env.PRODUCTION_NOTION_STUDY_POST_DATABASE,

    NOTION_STUDY_APPLY_DATABASE: isLocal
      ? process.env.TEST_NOTION_STUDY_APPLY_DATABASE
      : process.env.PRODUCTION_NOTION_STUDY_APPLY_DATABASE,

    /*
     * SLACK WEB HOOK
     */
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
};

module.exports = withPlugins(
  [
    withBundleAnalyzer,
    [
      withAntdLess,
      {
        lessVarsFilePath: "./styles/antd.less",
        lessVarsFilePathAppendToEndOfContent: true,
      },
    ],
  ],
  nextConfig
);
