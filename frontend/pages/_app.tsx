import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "../constants";
import { MoralisProvider } from "react-moralis";
import { GuildsProvider } from "../context/useGuildsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl={MORALIS_SERVER_URL || ""}
      appId={MORALIS_APP_ID || ""}
    >
      {/* <GuildsProvider> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* </GuildsProvider> */}
    </MoralisProvider>
  );
}

export default MyApp;
