import React from "react";
import styles from "./LandingView.module.scss";
import Image from "next/image";
import Link from "next/link";
import { PINNED_ASSETS } from "@/constants";

export const LandingView = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1>Peer 2 Peer Crypto Gaming Like Never Before!</h1>
        <p>
          Revolutionize Your Gaming Experience: Explore Decentralized Peer 2
          Peer Crypto Gaming & Gambling. Be the Bankroller, Play fun games, and
          Reap the Rewards.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/game">
            <button>Play Now</button>
          </Link>
          <button
          // todo:
          >
            Get GH Token
          </button>
        </div>
      </div>
      <Image
        src={PINNED_ASSETS.landingPageGraphic}
        width={550}
        height={500}
        alt="Game house landing image"
      />
    </div>
  );
};
