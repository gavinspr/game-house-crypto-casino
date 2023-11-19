import React from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import Layout from "@/components/Layout";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/configs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WagmiConfig>
  );
}
