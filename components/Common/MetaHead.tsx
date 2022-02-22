import React from "react";
import Head from "next/head";
import ThumbnailImage from "public/image/open_graph_thumbnail.png";

// TYPES

interface Props {
  title?: string;
  thumbnail?: string;
  description?: string;
}

// COMPONENT

const MetaHead = (props: Props) => {
  const image = props.thumbnail || process.env.BASE_URL + ThumbnailImage.src;
  const description =
    props.description || "프밍 스터디 | 이제 혼자가 아닌 함께 스터디하자";
  const title = props.title ? `${props.title} | 프밍 스터디` : "프밍 스터디";

  const openGraphObj = {
    og: {
      title,
      image,
      description,
      type: "website",
      site_name: "프밍 스터디",
      locale: "ko",
    },
    twitter: {
      title,
      image,
      description,
      card: "image",
    },
  };

  return (
    <Head>
      <title>{openGraphObj.og.title}</title>
      {Object.keys(openGraphObj.og).map((it) => {
        return (
          <meta
            key={`meta_og_${it}`}
            property={`og:${it}`}
            content={openGraphObj.og[it]}
          />
        );
      })}
      {Object.keys(openGraphObj.twitter).map((it) => {
        return (
          <meta
            key={`meta_twitter_${it}`}
            property={`twitter:${it}`}
            content={openGraphObj.twitter[it]}
          />
        );
      })}
    </Head>
  );
};

export default MetaHead;
