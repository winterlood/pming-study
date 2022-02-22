import Header from "components/Common/Header";
import "../styles/globals.scss";
import "../styles/antd.less";
import Footer from "components/Common/Footer";
import MetaHead from "components/Common/MetaHead";
import Head from "next/head";

import favico from "public/favicon.ico";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={favico.src} type="image/x-icon" />
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
