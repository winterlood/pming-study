import PaddingContainer from "components/Common/PaddingContainer";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import style from "./Header.module.scss";
import MobileDrawer from "./MobileDrawer";

import { MenuOutlined } from "@ant-design/icons";
// ANTD

// COMPS

// STATICS

// TYPES

// COMPONENT

interface MenuList {
  link: string;
  display: string;
}

const MenuList: MenuList[] = [
  { link: "/about", display: "DEMATE란?" },
  { link: "/challenge", display: "챌린지" },
  { link: "/apply", display: "챌린지멘토지원" },
  { link: "/help", display: "챌린지도움말" },
];

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((v) => !v);
  }, []);

  return (
    <header className={style.container}>
      <PaddingContainer>
        <div className={style.container_inner}>
          <div>
            <Link href={"/"} passHref>
              <h3>DEVMATE</h3>
            </Link>
          </div>

          <nav className={style.pc_nav}>
            {MenuList.map((it) => (
              <Link key={it.link} href={it.link}>
                <a className={style.nav_item}>{it.display}</a>
              </Link>
            ))}
          </nav>

          <div onClick={toggleDrawer} className={style.mobile_nav}>
            <MenuOutlined />
          </div>
        </div>
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={toggleDrawer}
          menuList={MenuList}
        />
      </PaddingContainer>
    </header>
  );
};

export default Header;
