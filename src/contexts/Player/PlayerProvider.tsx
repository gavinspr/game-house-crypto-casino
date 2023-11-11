import { useContext, useEffect, useState } from "react";
import PlayerContext from "./PlayerContext";
import { PlayerContextType, WhitelistDetailsType } from "@/types";

type PropTypes = {
  children: JSX.Element;
};

export const usePlayerContext = () =>
  useContext(PlayerContext) as PlayerContextType;

export const PlayerProvider = ({ children }: PropTypes) => {
  const [whitelisted, setWhitelisted] = useState<WhitelistDetailsType>(null);


  return (
    <PlayerContext.Provider value={{ whitelisted, setWhitelisted }}>
      {children}
    </PlayerContext.Provider>
  );
};
