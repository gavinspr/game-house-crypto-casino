import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/config";

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WagmiConfig>
      ) : null}
    </>
  );
}
