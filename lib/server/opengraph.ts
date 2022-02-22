import { notion_types } from "@types";
import fs from "fs";
import { createHash } from "crypto";
import { chromium } from "playwright";

export const getOpenGraphImage = (blocks: notion_types.Block[]) => {
  const openGraphBlock = blocks.find((it) => it.type === "image");
  if (openGraphBlock) {
    if (openGraphBlock.type === "external") {
      return openGraphBlock.image.external.url;
    } else {
      return openGraphBlock.image.file.url;
    }
  }
};

export async function getStudyPageOpenGraphImage(path) {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  const baseUrl = "https://opengraph-image-generator.vercel.app/pming/study?";
  const url = `${baseUrl}${path}`;
  const hash = createHash("md5").update(url).digest("hex");

  const ogImageDir = `./public/images/og`;
  const imagePath = `${ogImageDir}/${hash}.png`;
  const publicPath = `${process.env.SITE_URL}/images/og/${hash}.png`;
  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (e) {
    console.log(`generating og image for ${path}`);
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: "networkidle" });
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();
  fs.mkdirSync(ogImageDir, { recursive: true });
  fs.writeFileSync(imagePath, buffer);
  return publicPath;
}
