import React from "react";
import styles from "./GHLoader.module.scss";
import {
  RiseLoader,
  ScaleLoader,
} from "react-spinners";

export const GHLoader = () => {
  return (
    <div className={styles.wrap}>
      <RiseLoader size={36} color="#d7b736" />
      {/* <ScaleLoader width={25} height={150} color="#d7b736" /> */}
    </div>
  );
};
