import React from "react";
import styles from "./Footer.module.scss";
import Link from "next/link";
import {
  FaTelegramPlane,
  FaRedditAlien,
  FaDiscord,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className={styles.wrap}>
      <div className={styles.linkGroup}>
        <Link
          href="/"
          // todo:
        >
          <h4>Proposals</h4>
        </Link>
        <Link
          href="/"
          // todo:
        >
          <h4>Blog</h4>
        </Link>
        <Link
          href="/"
          // todo:
        >
          <h4>Docs</h4>
        </Link>
        <Link
          href="/"
          // todo:
        >
          <h4>Audit</h4>
        </Link>
      </div>
      <div className={styles.socialGroup}>
        <a
          href="/"
          // todo:
        >
          <FaTelegramPlane />
        </a>
        <a
          href="/"
          // todo:
        >
          <FaRedditAlien />
        </a>
        <a
          href="/"
          // todo:
        >
          <FaDiscord />
        </a>
        <a
          href="/"
          // todo:
        >
          <FaTwitter />
        </a>
        <a
          href="/"
          // todo:
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};
