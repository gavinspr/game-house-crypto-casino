import { GameHouseGameType } from "./GameHouseGameType";

export type RunningGameStatusType =
  | "queuing"
  | "open"
  | "closed"
  | "stopped"
  | "uninitiated";

export type GameChatMessage = {
  player: any;
  time: string;
  message: string;
};

export type RunningGameType = {
  uuid: string;
  createdAt: string;
  startedAt: string | null;
  beginAt: string;
  status: RunningGameStatusType;
  connectedPlayerCount: number;
  gameType: string;
  gameToken: string;
  results: any | null; // todo
  endedAt: string | null;
  gameDetailsId: number;
  gameHouseGames?: GameHouseGameType;
  chat: Array<GameChatMessage>;
};
