import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Game.module.scss"; // todo: make style sheet
import { GameConnectionModal } from "@/components";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useFetchRunningGame } from "@/hooks";

const GamePage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { runningGame } = useFetchRunningGame(router.query.uuid as string, {
    onError: () => toast.error("Error Loading Game"),
  });

  useEffect(() => {
    mutate("running_game");
  }, [router.query.uuid]);

  useEffect(() => {
    if (!runningGame?.gameHouseGames) return;

    mutate("selected_game_type", runningGame?.gameHouseGames);
  }, [runningGame?.gameHouseGames]);

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
      </Head>
      <main className={styles.main}>
        <GameConnectionModal runningGame={runningGame} />
      </main>
    </>
  );
};

export default GamePage;
