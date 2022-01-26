import { getDatabase } from "@notionhq/client/build/src/api-endpoints";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <header>
        <h3>header</h3>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
