import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Game.module.scss"; // todo: make style sheet
import { GameHouseGameType } from "@/types";
import { GHLoader, GameTokenTypeTile } from "@/components";
import { useRouter } from "next/router";
import { findAvailableGameUUID } from "@/helpers";
import { toast } from "react-toastify";
import { useFetchRowBySlug } from "@/hooks";

const GameTypePage = () => {
  const router = useRouter();

  const { data: game, mutate } = useFetchRowBySlug<GameHouseGameType>(
    "selected_game_type",
    "game_house_games",
    router.query.type as string,
    {
      onError: () => toast.error("Error Loading Game"),
    }
  );

  useEffect(() => {
    mutate();
  }, [router.query.type]);

  const onStart = async (token: string) => {
    if (!game) return;

    // todo: need to pass custom game details and other data such as min entry / max entry $$ amounts
    try {
      //  The user will be put into the appropriate game channel via presence but chat will not be open yet
      const availableGameUUID: string = await findAvailableGameUUID(
        game,
        token
      );

      router.push(`${router.asPath}/${availableGameUUID}`);
    } catch (error: any) {
      toast.error("Error Finding Game");
    }
  };

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
        <meta name="description" content="Peer 2 Peer Crypto Gaming" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!game ? (
          <GHLoader />
        ) : (
          <div className={styles.gameTypeList}>
            {game.acceptedTokens?.map((token: string, index: number) => (
              <GameTokenTypeTile
                key={`${token}-${index}`}
                token={token}
                customGameAllowed={game.customGameAllowed}
                onStart={onStart}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default GameTypePage;
