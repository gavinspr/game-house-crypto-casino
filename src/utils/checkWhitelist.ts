import { supabase } from "@/services";
import { WhitelistDetailsType, WhitelistedAddressType } from "@/types";
import { camelize } from "./camelize";

export const checkWhitelist = async (
  walletAddress: string
): Promise<WhitelistDetailsType> => {
  let whitelisted: WhitelistDetailsType = null;

  const { data, error } = await supabase.from("whitelist").select("*");

  const whitelist: Array<WhitelistedAddressType> | undefined = data?.map(
    (address: Record<string, any>) => camelize<WhitelistedAddressType>(address)
  );

  if (error) {
    console.error("Error fetching whitelist:", error.message);
  } else {
    if (whitelist) {
      const whitelistedAddress = whitelist.find(
        (whitelisted: WhitelistedAddressType) =>
          whitelisted.walletAddress === walletAddress
      );

      if (whitelistedAddress) {
        whitelisted = {
          beta: whitelistedAddress.beta,
          vip: whitelistedAddress.vip,
          admin: whitelistedAddress.admin,
        };
      }
    }
  }

  return whitelisted;
};
