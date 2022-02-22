import { Drawer } from "antd";
import React, { useEffect } from "react";
import style from "./MobileDrawer.module.scss";

import { CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import BrandLogo from "public/image/pming_study_logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

// ANTD

// COMPS

// STATICS

// TYPES

interface Props {
  menuList: {
    link: string;
    display: string;
    isExternalPath?: boolean;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

// COMPONENT

const MobileDrawer = ({ menuList, isOpen, onClose }: Props) => {
  const router = useRouter();

  useEffect(() => {
    onClose();
  }, [onClose, router.pathname]);

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
          <div className={style.head_title}>
            <Image
              src={BrandLogo.src}
              width={"100"}
              height={"29"}
              alt="pming_study_logo"
            />
          </div>
          <div className={style.head_action} onClick={onClose}>
            <CloseOutlined />
          </div>
        </div>
        <div className={style.body}>
          {menuList.map((it) => (
            <Link key={it.link} href={it.link} passHref>
              <a target={it.isExternalPath && "_blank"}>
                <div className={style.link_wrapper}>{it.display}</div>
              </a>
            </Link>
          ))}
        </div>
        <div className={style.footer}>Ver 1.0.0</div>
      </div>
    </Drawer>
  );
};

export default MobileDrawer;
