import React, { useEffect, useRef } from "react";
import Head from "next/head";
import styles from "../../../styles/RunningGamePage.module.scss"; // todo: make style sheet
import { GameChat, GameConnectionModal, GamePortal } from "@/components";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useFetchRunningGame } from "@/hooks";
import { RealtimeChannel } from "@supabase/supabase-js";
import { camelize } from "@/utils";
import { RunningGameType } from "@/types";
import { subscribeToGameChannel } from "@/helpers";
import { useAccount } from "wagmi";
import { supabase } from "@/services";

// todo: if a (non-continuous) game has already started and a player attempts to reconnect need to make sure only allowed players can access game

const RunningGamePage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { address } = useAccount();

  const { runningGame } = useFetchRunningGame(router.query.uuid as string, {
    onError: () => toast.error("Error Loading Game"),
  });

  const gameChannelRef = useRef<RealtimeChannel | undefined>(undefined);

  const [hasStarted, setHasStarted] = React.useState<boolean>(false); // temp

  useEffect(() => {
    mutate("running_game");
  }, [router.query.uuid]);

  useEffect(() => {
    if (!runningGame?.gameHouseGames) return;

    mutate("selected_game_type", runningGame?.gameHouseGames);
  }, [runningGame?.gameHouseGames]);

  useEffect(() => {
    if (runningGame?.uuid && runningGame.gameHouseGames) {
      const queuingGameChannel: RealtimeChannel = supabase.channel(
        `${runningGame.gameHouseGames.slug}-${runningGame?.uuid}`
      );

      gameChannelRef.current = queuingGameChannel;

      subscribeToGameChannel(
        queuingGameChannel,
        address,
        runningGame?.uuid,
        handleRealtimeUpdate,
        handlePresenceSync
      );
    }
  }, [runningGame?.uuid]);

  const handleRealtimeUpdate = (payload: any) => {
    const updatedGameData = camelize<RunningGameType>(payload.new);
    mutate("running_game", updatedGameData, false);
  };

  const handlePresenceSync = (payload: any) => {
    // todo:
  };

  return (
    <>
      <Head>
        <title>GameHouse | Crypto Gaming</title>
      </Head>
      <main className={styles.wrap}>
        {!hasStarted ? (
          <div className={styles.gameWrap}>
            <GamePortal />
            <GameChat
              runningGame={runningGame}
              gameChannelRef={gameChannelRef}
            />
          </div>
        ) : (
          <GameConnectionModal
            runningGame={runningGame}
            gameChannelRef={gameChannelRef}
          />
        )}
      </main>
    </>
  );
};

export default RunningGamePage;
