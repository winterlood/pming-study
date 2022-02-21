import { Drawer } from "antd";
import React from "react";
import style from "./MobileDrawer.module.scss";

import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  menuList: {
    link: string;
    display: string;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

// COMPONENT

const MobileDrawer = ({ menuList, isOpen, onClose }: Props) => {
  return (
    <Drawer
      width={"90%"}
      placement={"right"}
      closable={false}
      onClose={onClose}
      visible={isOpen}
      key={"right"}
    >
      <div className={style.drawer_inner}>
        <div className={style.head}>
          <div className={style.head_title}>DEMATE</div>
          <div className={style.head_action} onClick={onClose}>
            <CloseOutlined />
          </div>
        </div>
        <div className={style.body}>
          {menuList.map((it) => (
            <Link key={it.link} href={it.link} passHref>
              <div className={style.link_wrapper}>{it.display}</div>
            </Link>
          ))}
        </div>
        <div className={style.footer}>DEMATE Ver 1.0.0</div>
      </div>
    </Drawer>
  );
};

export default MobileDrawer;
