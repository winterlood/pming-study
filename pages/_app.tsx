import Header from "components/Common/Header";
import { RecoilRoot } from "recoil";
import "../styles/globals.scss";
import "../styles/antd.less";
import Footer from "components/Common/Footer";
import MetaHead from "components/Common/MetaHead";
import Head from "next/head";

import favico from "public/favicon.ico";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <link rel="shortcut icon" href={favico.src} type="image/x-icon" />
      </Head>
      <MetaHead />
      <Header />
      <div className={"app_main"}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
