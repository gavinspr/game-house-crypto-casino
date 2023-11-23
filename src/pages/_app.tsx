import React from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/configs";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}
