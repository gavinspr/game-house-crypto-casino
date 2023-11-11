export type WhitelistedAddressType = {
  id: number;
  createdAt: string;
  beta: boolean;
  vip: boolean;
  admin: boolean;
  walletAddress: string;
  notes: string | null;
};
