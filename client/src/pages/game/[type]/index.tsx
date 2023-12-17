import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/GameTypePage.module.scss"; // todo: make style sheet
import { GameHouseGameType } from "@/types";
import { GHLoader, GameTokenTypeTile } from "@/components";
import { useRouter } from "next/router";
import { findAvailableGameUUID } from "@/helpers";
import { toast } from "react-toastify";
import { useFetchRowBySlug } from "@/hooks";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { gameHouseArtifact, blackjackArtifact } from "@/configs";

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

  const { config } = usePrepareContractWrite({
    address: process.env.GAMEHOUSE_ADDRESS as `0x${string}` | undefined,
    abi: gameHouseArtifact.abi,
    functionName: "mintRunningGame",
    args: [process.env.BLACKJACK_ADDRESS, "BTC"],
    onError(error) {
      console.log("Error", error); // todo
    },
  });

  const { data, write } = useContractWrite(config);

  const {
    data: transactionData,
    isLoading,
    isSuccess,
    isError,
  } = useWaitForTransaction({
    chainId: 41,
    hash: data?.hash,
  });

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

  const handleCreateGame = () => {
    // todo
    if (!write) return;
    write();
  };

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
      </Head>
      <main className={styles.wrap}>
        {!game ? (
          <GHLoader />
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                // outline: "1px solid red",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                style={{
                  padding: ".75rem 1rem",
                  borderRadius: "0.5rem",
                }}
                onClick={handleCreateGame}
              >
                Create
              </button>
              <button
                style={{
                  padding: ".75rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                Filter
              </button>
            </div>
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
          </div>
        )}
      </main>
    </>
  );
};

export default GameTypePage;
