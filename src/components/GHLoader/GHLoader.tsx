import React from "react";
import styles from "./GHLoader.module.scss";
import { RiseLoader } from "react-spinners";

export const GHLoader = () => {
  return (
    <div className={styles.wrap}>
      <RiseLoader size={56} color="var(--color-accent)" />
    </div>
  );
};
