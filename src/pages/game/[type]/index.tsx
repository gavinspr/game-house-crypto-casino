import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Game.module.scss"; // todo: make style sheet
import { GameHouseGameType } from "@/types";
import { GHLoader, GameTokenTypeTile } from "@/components";
import { useRouter } from "next/router";
import { findAvailableGameUUID, supabaseFetcher } from "@/helpers";
import useSWR from "swr";
import { toast } from "react-toastify";

const GameTypePage = () => {
  const router = useRouter();
  const { getRowBySlug } = supabaseFetcher();

  const {
    data: game,
    error,
    mutate,
  } = useSWR<GameHouseGameType | null | undefined, Error>(
    "selected_game",
    async () =>
      !router.query.type
        ? null
        : await getRowBySlug<GameHouseGameType>(
            "game_house_games",
            router.query.type as string
          )
  );

  useEffect(() => {
    mutate();
  }, [router.query.type]);

  useEffect(() => {
    if (!error) return;
    toast.error("Error Loading Game");
  }, [error]);

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
