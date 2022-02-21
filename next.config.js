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
    //
    // NOTION_SERVER_SIDE_READ_ACCESS_TOKEN:
    //   "secret_xMgt5VD8zfaMAzswBFNrsHywXcckNj3EfIKwnRIFQ4s",
    // NOTION_CLIENT_SIDE_READ_ACCESS_TOKEN:
    //   "secret_BrF7rQuXARvfFKQ6KqtE4A4CfusrqtMdliPf901CYlP",
    // NOTION_CLIENT_SIDE_WRITE_ACCESS_TOKEN:
    //   "secret_xuTF0PNsi9smQeHNkeCFKt4LivD12CP6ivPmoPXCxgy",
    /*
     * PAGE & DATABASES
     */
    NOTION_INDEX_PAGE: process.env.NOTION_INDEX_PAGE,
    NOTION_POST_DATABASE: process.env.NOTION_POST_DATABASE,
    NOTION_STUDY_DATABASE: process.env.NOTION_STUDY_DATABASE,
    NOTION_STUDY_POST_DATABASE: process.env.NOTION_STUDY_POST_DATABASE,
    NOTION_STUDY_APPLY_DATABASE: process.env.NOTION_STUDY_APPLY_DATABASE,
    //
    // NOTION_INDEX_PAGE: "Udemy-Test-53f6273d24864d82b993e1225e290f8e",
    // NOTION_POST_DATABASE: "b3fd5f3621c7476b9daf904bb8e04325",
    // NOTION_STUDY_DATABASE: "6d0f7c06e93f4d1f8c836d6cdafaf7b1",
    // NOTION_STUDY_POST_DATABASE: "91c877d639ab46b0ba63c86c0102b456",
    // NOTION_STUDY_APPLY_DATABASE: "2e0821d03bf448d3961ffd8fec78b765",
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
