import {
  RealtimeChannel,
  RealtimeChannelSendResponse,
  RealtimePresenceState,
} from "@supabase/supabase-js";

export const subscribeToGameChannel = (
  channel: RealtimeChannel,
  playerAddress: `0x${string}` | undefined,
  uuid: string,
  handleRealtimeUpdate: (payload: any) => void,
  handlePresenceSync: (payload: any) => void
) => {
  channel
    .on("presence", { event: "sync" }, () => {
      const updatedState: RealtimePresenceState<{}> = channel.presenceState();
      handlePresenceSync(updatedState);
    })
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      // console.log("join", key, newPresences); // todo:
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      // console.log("leave", key, leftPresences); // todo:
    })
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "running_games",
        filter: `uuid=eq.${uuid}`,
      },
      handleRealtimeUpdate
    )
    .subscribe(async (status) => {
      if (status !== "SUBSCRIBED") {
        return;
      }

      const userStatus = {
        user: playerAddress,
        online_at: new Date().toISOString(),
      };

      const presenceTrackStatus: RealtimeChannelSendResponse =
        await channel.track(userStatus);

      if (presenceTrackStatus === "error") {
        // todo
      }

      if (presenceTrackStatus === "timed out") {
        // todo
      }
    });
};
