/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  env: {
    /*
     * INTEGRATION KEYS
     */
    NOTION_SERVER_SIDE_READ_ACCESS_TOKEN:
      process.env.NOTION_SERVER_SIDE_READ_ACCESS_TOKEN,
    NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN:
      process.env.NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN,
    NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN:
      process.env.NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN,

    /*
     * PAGE & DATABASES
     */
    NOTION_INDEX_PAGE: process.env.NOTION_INDEX_PAGE,
    NOTION_POST_DATABASE: process.env.NOTION_POST_DATABASE,
    NOTION_STUDY_DATABASE: process.env.NOTION_STUDY_DATABASE,
    NOTION_STUDY_POST_DATABASE: process.env.NOTION_STUDY_POST_DATABASE,
    NOTION_STUDY_APPLY_DATABASE: process.env.NOTION_STUDY_APPLY_DATABASE,
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

// module.exports = withBundleAnalyzer(
//   withAntdLess({
//     lessVarsFilePath: "./styles/antd.less",
//     lessVarsFilePathAppendToEndOfContent: true,
//     ...nextConfig,
//     webpack(config) {
//       return config;
//     },
//   })S
// );
