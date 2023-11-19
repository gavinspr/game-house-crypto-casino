import useSWR from "swr";
import { supabase } from "@/services";
import { RunningGameType } from "@/types";
import { camelize } from "@/utils";

const useGetRunningGame = (uuid: string) => {
  const fetcher = async () => {
    if (!uuid) return;

    const { data, error } = await supabase
      .from("running_games")
      .select(
        `
          *,
          game_house_games (
            *
          )
        `
      )
      .eq("uuid", uuid);

    if (error) throw error;

    if (!data || data.length === 0) throw Error(`No game found for ${uuid}`);

    const camelizedData: Array<RunningGameType> = data?.map(
      (row: Record<string, any>) => camelize<RunningGameType>(row)
    );

    return camelizedData[0];
  };

  const { data: runningGame, error } = useSWR<
    RunningGameType | undefined,
    Error
  >("running_game", fetcher);

  return {
    runningGame,
    error,
    isLoading: !runningGame && !error,
  };
};

export default useGetRunningGame;
