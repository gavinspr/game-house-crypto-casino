import { supabase } from "@/services";

export const archiveGame = async (uuid: string) => {
  const { error } = await supabase
    .from("running_games")
    .delete()
    .eq("uuid", uuid)
    .select();

  if (error) {
    // todo:
  }

  // todo: store and pin on IPFS
  // todo: don't archive game in IPFS if never got passed queue
};
