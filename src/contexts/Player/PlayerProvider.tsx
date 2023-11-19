import { useContext } from "react";
import PlayerContext from "./PlayerContext";
import { PlayerContextType } from "@/types";

type PropTypes = {
  children: JSX.Element;
};

export const usePlayerContext = () =>
  useContext(PlayerContext) as PlayerContextType;

export const PlayerProvider = ({ children }: PropTypes) => {
  return <PlayerContext.Provider value={{}}>{children}</PlayerContext.Provider>;
};
