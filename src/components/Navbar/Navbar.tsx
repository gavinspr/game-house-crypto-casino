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
        <div className={styles.container}>
          <Link href="/">
            <h1
            // todo: Logo
            >
              GameHouse
            </h1>
          </Link>
          <div className={styles.linkGroup}>
            <Link href="/game">
              <h3>Game</h3>
            </Link>
            <Link href="/dashboard">
              <h3>Dashboard</h3>
            </Link>
            <Link href="/governance">
              <h3>DAO</h3>
            </Link>
          </div>
        </div>
        <div onClick={closeAll}>
          <w3m-button size="sm" />
        </div>
      </div>
    </header>
  );
};
