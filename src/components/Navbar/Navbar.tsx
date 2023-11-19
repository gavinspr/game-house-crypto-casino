import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";

export const Navbar = () => {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <header>
      <div
        className={styles.backdrop}
        style={{
          opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
        }}
      />
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <h1
            // todo: Logo
            >
              GameHouse
            </h1>
          </Link>
        </div>
        <div className={styles.buttons}>
          <Link href="/game">
            <h2>Game</h2>
          </Link>
          {/* <Link href="/">
            <h2>Governance</h2>
          </Link>
          <Link href="/">
            <h2>Leaderboard</h2>
          </Link> */}
          <div
            onClick={closeAll}
            className={`${styles.highlight} ${
              isNetworkSwitchHighlighted ? styles.highlightSelected : ``
            }`}
          >
            <w3m-network-button />
          </div>
          <div
            onClick={closeAll}
            className={`${styles.highlight} ${
              isConnectHighlighted ? styles.highlightSelected : ``
            }`}
          >
            <w3m-button />
          </div>
        </div>
      </div>
    </header>
  );
};
