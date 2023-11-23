import React from "react";
import styles from "./GameCard.module.scss";
import { GameHouseGameType } from "@/types";
import Link from "next/link";

type PropTypes = {
  gameDetails: GameHouseGameType;
};

export const GameCard = ({ gameDetails }: PropTypes) => {
  return (
    <Link href={`/game/${gameDetails.slug}`}>
      <div className={styles.wrap}>{gameDetails.name}</div>
    </Link>
  );
};
