import { useEffect } from "react";
import { Router } from "next/router";
import Head from "next/head";

import "../styles/globals.scss";
import "../styles/antd.less";

import Header from "components/Common/Header";
import Footer from "components/Common/Footer";
import MetaHead from "components/Common/MetaHead";
import ExternalScript from "components/Common/ExternalScript";

import favico from "public/favicon.ico";

import "nprogress/nprogress.css";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="naver-site-verification"
          content="7766b2227c25cedd3350fb640dc1bb666a11500a"
        />
        <link rel="shortcut icon" href={favico.src} type="image/x-icon" />
        <ExternalScript />
      </Head>
      <MetaHead />
      <Header />
      <div className={"app_main"}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
