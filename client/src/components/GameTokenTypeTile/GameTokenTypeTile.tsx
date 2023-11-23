import React from "react";
import styles from "./GameTokenTypeTile.module.scss";

type PropTypes = {
  token: string;
  customGameAllowed: boolean; // todo:
  onStart: (token: string) => Promise<void>;
};

export const GameTokenTypeTile = ({
  token,
  customGameAllowed,
  onStart,
}: PropTypes) => {
  return (
    <div className={styles.wrap} onClick={() => onStart(token)}>
      <p>{token}</p>
    </div>
  );
};
