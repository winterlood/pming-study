import { getDatabase } from "@notionhq/client/build/src/api-endpoints";
import Header from "components/Common/Header";
import { RecoilRoot } from "recoil";
import "../styles/globals.scss";
import "../styles/antd.less";
import Footer from "components/Common/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Header />
      <div className={"app_main"}>
        <Component {...pageProps} />
      </div>
      <Footer />
    </RecoilRoot>
  );
}

export default MyApp;
