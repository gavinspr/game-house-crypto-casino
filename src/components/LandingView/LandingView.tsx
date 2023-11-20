import React from "react";
import styles from "./LandingView.module.scss";
import Image from "next/image";

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
          <button>Play Now</button>
          <button
          // todo:
          >
            Get Token
          </button>
        </div>
      </div>
      <Image
        src={"/landing_view_graphic.jpeg"} // todo: put in IPFS and retrieve from IPFS
        width={650}
        height={600}
        alt="Game house landing image"
      />
    </div>
  );
};
