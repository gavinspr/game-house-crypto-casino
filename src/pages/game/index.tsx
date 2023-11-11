import React from "react";
import Head from "next/head";
import styles from "../../styles/Game.module.scss";
import { GetServerSideProps } from "next";
import { supabase } from "@/services";
import { GameType } from "@/types";
import { GameTile } from "@/components/GameTile/GameTile";
import { camelize } from "@/utils";

type PropTypes = {
  games: Array<GameType>;
};

const GamePage = ({ games }: PropTypes) => {
  console.log(games);
  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
        <meta name="description" content="Peer 2 peer crypto gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.gamesGrid}>
          {games.map((game: GameType) => (
            <GameTile key={`${game.name}`} gameDetails={game} />
          ))}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PropTypes> = async () => {
  const { data, error } = await supabase.from("games").select("*");

  const games = data?.map((game: Record<string, any>) =>
    camelize<GameType>(game)
  );

  if (error) {
    console.error("Error fetching data from Supabase:", error.message);
    return {
      props: {
        games: [],
      },
    };
  }

  return {
    props: {
      games: games || [],
    },
  };
};

export default GamePage;
