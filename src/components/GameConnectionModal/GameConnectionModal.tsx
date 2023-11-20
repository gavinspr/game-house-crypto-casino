import React, { useEffect, useRef } from "react";
import styles from "./GameConnectionModal.module.scss";
import { FadeLoader, HashLoader, RiseLoader, BeatLoader } from "react-spinners";
import { GameHouseGameType, RunningGameType } from "@/types";
import { camelize } from "@/utils";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/services";
import { useAccount } from "wagmi";
import { GameStartCountdown } from "../GameStartCountdown/GameStartCountdown";
import { archiveGame, subscribeToGameChannel } from "@/helpers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { useFetchRowBySlug } from "@/hooks";

// todo: if the countdown reaches 0 and min players have not joined restart the countdown
// todo: if more than maxPlayers enter a room they should be kicked or removed before the queue drops

type PropTypes = {
  runningGame: RunningGameType | undefined;
};

export const GameConnectionModal = ({ runningGame }: PropTypes) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { address } = useAccount();

  const { data: gameDetails } = useFetchRowBySlug<GameHouseGameType>(
    "selected_game_type",
    "game_house_games",
    router.query.type as string,
    {
      revalidateOnMount: false,
      onError: () => toast.error("Error Loading Game"),
    }
  );

  const gameChannelRef = useRef<RealtimeChannel | undefined>(undefined);

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

  useEffect(() => {
    if (!runningGame || !runningGame.gameHouseGames) return;
    // If game has not reached maxPlayers keep users in queue screen
    if (
      runningGame.connectedPlayerCount !== runningGame.gameHouseGames.maxPlayers
    )
      return;

    // ? should logic just go in handlePresenceSync
    // todo: start game !! ^^
  }, [runningGame?.connectedPlayerCount]);

  const handleRealtimeUpdate = (payload: any) => {
    const updatedGameData = camelize<RunningGameType>(payload.new);
    mutate("running_game", updatedGameData, false);
  };

  const handlePresenceSync = (payload: any) => {
    // todo:
  };

  const handleLeaveQueue = async () => {
    if (!runningGame) return;

    if (gameChannelRef.current) {
      gameChannelRef.current.untrack();
      gameChannelRef.current.unsubscribe();

      const { data, error } = await supabase
        .from("running_games")
        .update({
          connected_player_count: runningGame?.connectedPlayerCount - 1,
        })
        .eq("uuid", runningGame?.uuid)
        .select();

      if (error) {
        return toast.error("Error Leaving Queue");
      }

      if (!data || data.length < 0) {
        return toast.error("Error Leaving Queue");
      }

      const camelizedData: Array<RunningGameType> = data?.map(
        (row: Record<string, any>) => camelize<RunningGameType>(row)
      );

      // Archive game when last player leaves
      if (camelizedData[0].connectedPlayerCount === 0)
        await archiveGame(runningGame?.uuid);
    }

    mutate("running_game", undefined, false);

    const path: string = router.asPath.split("/")[2];
    router.push(`/game/${path}`);
  };

  return (
    <div className={styles.wrap}>
      {runningGame ? (
        <>
          <h3>
            {runningGame?.gameToken} {gameDetails?.name}
          </h3>
          <p className={styles.playerCount}>
            {runningGame.connectedPlayerCount}/{gameDetails?.maxPlayers}
          </p>
          <GameStartCountdown startTime={runningGame.beginAt} />
          <HashLoader color="#d7b736" className={styles.loader} />
          <button onClick={handleLeaveQueue}>Leave Queue</button>
        </>
      ) : (
        <>
          <h2>Searching For Game</h2>
          <HashLoader color="#d7b736" className={styles.loader} />
        </>
      )}
    </div>
  );
};
