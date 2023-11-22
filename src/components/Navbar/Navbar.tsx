import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { PINNED_ASSETS } from "@/constants";

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
            <Image
              src={PINNED_ASSETS.appLogo}
              alt="Game house logo"
              width={300}
              height={50}
            />
          </Link>
          <div className={styles.linkGroup}>
            <Link href="/game">
              <h3>Games</h3>
            </Link>
            <Link href="/">
              <h3>Lottery</h3>
            </Link>
            <Link href="/">
              <h3>Dashboard</h3>
            </Link>
            <Link href="/">
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
