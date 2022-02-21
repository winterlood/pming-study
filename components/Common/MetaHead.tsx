import React from "react";
import Head from "next/head";
import ThumbnailImage from "public/image/open_graph_thumbnail.png";
import Router from "next/router";
// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  title?: string;
  thumbnail?: string;
  description?: string;
}

// COMPONENT

const MetaHead = (props: Props) => {
  const openGraphObj = {
    og: {
      title: props.title ? `${props.title} | 프밍 스터디` : "프밍 스터디",
      type: "website",
      image: props.thumbnail || ThumbnailImage.src,
      description:
        props.description || "프밍 스터디 | 이제 혼자가 아닌 함께 스터디하자",
      site_name: "프밍 스터디",
      locale: "ko",
    },

    twitter: {
      card: "image",
      title: props.title ? `${props.title} | 프밍 스터디` : "프밍 스터디",
      description:
        props.description || "프밍 스터디 | 이제 혼자가 아닌 함께 스터디하자",
      image: props.thumbnail || ThumbnailImage.src,
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
