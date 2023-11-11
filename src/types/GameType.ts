export type GameStatus = "playable" | "beta" | "vip" | "closed";

export type GameType = {
  id: number;
  createdAt: string;
  name: string;
  acceptedCrypto: Array<string>;
  status: GameStatus;
  slug: string;
};
