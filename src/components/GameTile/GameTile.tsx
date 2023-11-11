import React from "react";
import styles from "./GameTile.module.scss";
import { GameType } from "@/types";
import Link from "next/link";
import { usePlayerContext } from "@/contexts";

type PropTypes = {
  gameDetails: GameType;
};

export const GameTile = ({ gameDetails }: PropTypes) => {
  const { whitelisted } = usePlayerContext();

  console.log(gameDetails.name, gameDetails.status);
  if (gameDetails.status === "beta" && !whitelisted?.beta) return;

  if (gameDetails.status === "vip" && !whitelisted?.beta) return;

  return (
    <Link href={`/game/${gameDetails.slug}`}>
      <div className={styles.wrap}>{gameDetails.name}</div>
    </Link>
  );
};
