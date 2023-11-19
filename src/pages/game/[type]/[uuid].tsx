import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Game.module.scss"; // todo: make style sheet
import { GameConnectionModal } from "@/components";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useGetRunningGame } from "@/hooks";

const GamePage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { runningGame, error } = useGetRunningGame(router.query.uuid as string);

  useEffect(() => {
    if (!error) return;

    toast.error("Error Loading Game");
  }, [error]);

  useEffect(() => {
    mutate("running_game");
  }, [router.query.uuid]);

  useEffect(() => {
    if (!runningGame?.gameHouseGames) return;

    mutate("selected_game_type", runningGame?.gameHouseGames, {
      revalidate: true,
      populateCache: true,
    });
  }, [runningGame?.gameHouseGames]);

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
        <meta name="description" content="Peer 2 Peer Crypto Gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <GameConnectionModal runningGame={runningGame} />
      </main>
    </>
  );
};

export default GamePage;
