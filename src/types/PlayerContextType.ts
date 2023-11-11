import { Dispatch, SetStateAction } from "react";
import { WhitelistDetailsType } from "./WhitelistedDetailsType";

export type PlayerContextType = {
  whitelisted: WhitelistDetailsType;
  setWhitelisted: Dispatch<SetStateAction<WhitelistDetailsType>>;
};
