import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import { useState } from "react";
import { Navbar } from "@/components";

export default function Home() {

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
        <meta name="description" content="Peer 2 Peer Crypto Gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
    </>
  );
}
