import React from "react";
import style from "./DetailPageSkeleton.module.scss";
import { Skeleton } from "antd";
import PaddingContainer from "./PaddingContainer";

// TYPES

interface Props {}

// COMPONENT

const DetailPageSkeleton = (props: Props) => {
  return (
    <PaddingContainer>
      <div className={style.container}>
        <div className={style.head}>
          <Skeleton
            active
            title={{ style: { height: "0px" } }}
            paragraph={{ rows: 1 }}
          />
          <Skeleton
            active
            title={{
              style: {
                width: "90%",
                height: "50px",
              },
            }}
            paragraph={{
              rows: 3,
            }}
          />
        </div>
        <div className={style.img_wrapper}>
          <Skeleton.Image style={{ width: "80%", height: "300px" }} />
        </div>
        <div>
          <Skeleton.Input
            style={{ width: "80%", height: 20, marginBottom: 10 }}
            active
          />
        </div>
        <div>
          <Skeleton.Input
            style={{ width: "60%", height: 20, marginBottom: 10 }}
            active
          />
        </div>
        <div>
          <Skeleton.Input
            style={{ width: "90%", height: 20, marginBottom: 10 }}
            active
          />
        </div>
        <div>
          <Skeleton.Input
            style={{ width: "40%", height: 20, marginBottom: 10 }}
            active
          />
        </div>
        {/* <DetailPageHeader
          headChildren={<Skeleton paragraph={{ rows: 1 }} />}
          title={<Skeleton paragraph={{ rows: 1 }} />}
          footerChildren={<Skeleton paragraph={{ rows: 1 }} />}
        /> */}
      </div>
    </PaddingContainer>
  );
};

export default DetailPageSkeleton;
