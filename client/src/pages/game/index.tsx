import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/GameSelectorPage.module.scss";
import { GameHouseGameType } from "@/types";
import { GHLoader, GameCard } from "@/components";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useFetchTable } from "@/hooks";

const GameSelectorPage = () => {
  const { mutate } = useSWRConfig();

  const { data: games } = useFetchTable<GameHouseGameType>(
    "game_house_games",
    "game_house_games",
    {
      onError: () => toast.error("Error Loading Games"),
    }
  );

  useEffect(() => {
    mutate("game_house_games", null, { populateCache: true });
  }, []);

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
      </Head>
      <main className={styles.wrap}>
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
