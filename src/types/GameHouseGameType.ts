export type GameStatus = "playable" | "beta" | "vip" | "closed";

export type GameHouseGameType = {
  id: number;
  createdAt: string;
  name: string;
  acceptedTokens: Array<string>;
  status: GameStatus;
  slug: string;
  minPlayers: number;
  maxPlayers: number;
  againstHouse: boolean;
  newGameWaitTime: number;
  isContinuous: boolean;
  customGameAllowed: boolean;
};
