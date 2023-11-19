import { supabase } from "@/services";
import { GameHouseGameType, RunningGameType } from "@/types";
import { camelize } from "../utils/camelize";

/**
 *
 * @param game GameHouse game object
 * @param token Selected crypto token to play with
 * @returns RunningGame uuid
 */
export const findAvailableGameUUID = async (
  game: GameHouseGameType,
  token: string
): Promise<string> => {
  const joinExistingGame = async (
    existingRunningGames: Array<RunningGameType>
  ): Promise<string> => {
    let selectedGame = {} as RunningGameType;

    // Sort by most players queued to least
    let existingGames: Array<RunningGameType> = existingRunningGames.sort(
      (a: RunningGameType, b: RunningGameType) =>
        b.connectedPlayerCount - a.connectedPlayerCount
    );

    if (game.isContinuous) {
      // Start with queuing games and find ones that are the closest to max players
      const queuingGames: Array<RunningGameType> = existingGames.filter(
        (runningGame: RunningGameType) => runningGame.status === "queuing"
      );

      // If no queuing games exist check for open games, add to ones with lowest amount of players
      if (queuingGames.length === 0) {
        const openGames: Array<RunningGameType> = existingGames
          .filter(
            (runningGame: RunningGameType) => runningGame.status === "open"
          )
          // Remove if player_addresses length is over max player count
          .filter(
            (runningGame: RunningGameType) =>
              runningGame.connectedPlayerCount < game.maxPlayers
          );

        selectedGame = openGames[openGames.length - 1];
      } else {
        selectedGame = queuingGames[0];
      }
    } else {
      selectedGame = existingGames[0];
    }

    // Add to player count
    const { error } = await supabase
      .from("running_games")
      .update({
        connected_player_count: selectedGame.connectedPlayerCount + 1,
      })
      .eq("uuid", selectedGame.uuid);

    if (error) throw error;

    return selectedGame.uuid;
  };

  // Search for existing matching games
  const { data, error } = await supabase
    .from("running_games")
    .select("*")
    .eq("game_type", game.slug)
    .in("status", ["queuing", game.isContinuous && "open"])
    .eq("game_token", token);

  if (error) throw error;

  // Check if any running games of this type exist
  if (data && data.length !== 0) {
    const existingRunningGames = data.map((a: RunningGameType) =>
      camelize<RunningGameType>(a)
    );

    return joinExistingGame(existingRunningGames);
  } else {
    // If there are no running games start new game

    const currentTime = new Date();

    // When the game should start
    const beginAt = new Date(
      currentTime.getTime() + game.newGameWaitTime
    ).toISOString();

    const { data, error } = await supabase
      .from("running_games")
      .insert({
        status: "queuing",
        connected_player_count: 1,
        game_type: game.slug,
        game_token: token,
        game_details_id: game.id,
        begin_at: beginAt,
      })
      .select();

    if (error) throw error;

    if (!data) {
      throw Error(
        `No data returned after inserting for new game ${token} ${game.slug}`
      );
    }

    const newGame = camelize<RunningGameType>(data[0]);

    return newGame.uuid;
  }
};
