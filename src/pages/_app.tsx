import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/configs";
import { PlayerProvider } from "@/contexts";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <PlayerProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PlayerProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
