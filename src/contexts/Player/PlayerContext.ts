import { PlayerContextType } from "@/types";
import { createContext } from "react";

const PlayerContext = createContext<PlayerContextType | null>(null);

export default PlayerContext;
