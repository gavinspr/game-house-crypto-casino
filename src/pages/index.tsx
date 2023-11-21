import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import {
  LandingView,
  LeaderboardView,
  PopularGamesHomeList,
} from "@/components";

export default function Home() {
  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
      </Head>
      <main className={styles.main}>
        <LandingView />
        <PopularGamesHomeList />
        <LeaderboardView />
      </main>
    </>
  );
}
