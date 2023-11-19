import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/Game.module.scss";
import { GameHouseGameType } from "@/types";
import { GHLoader, GameCard } from "@/components";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import supabaseFetcher from "@/helpers/supabaseFetcher";

const GameSelectorPage = () => {
  const { getTable } = supabaseFetcher();
  const { data: games, error } = useSWR(
    "game_house_games",
    getTable<GameHouseGameType>
  );

  const { mutate } = useSWRConfig();

  useEffect(() => {
    mutate("game_house_games", null, { populateCache: true });
  }, []);

  useEffect(() => {
    if (!error) return;

    toast.error("Error Loading Games");
  }, [error]);

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
        <meta name="description" content="Peer 2 Peer Crypto Gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {games && games.length > 0 ? (
          <div className={styles.gamesGrid}>
            {games?.map((game: GameHouseGameType) => (
              <GameCard key={`${game.name}`} gameDetails={game} />
            ))}
          </div>
        ) : (
          <GHLoader />
        )}
      </main>
    </>
  );
};

export default GameSelectorPage;
