import React from "react";
import styles from "./GameStartCountdown.module.scss";
import { useCountdown } from "@/hooks";
import { BeatLoader } from "react-spinners";
import { CountdownType } from "@/types";

// todo: if the countdown reaches 0 or the max players number is reached countdown should turn to say "game starting shortly" while game is being rendered

type PropTypes = {
  startTime: string;
};

export const GameStartCountdown = ({ startTime }: PropTypes) => {
  const countdown: CountdownType | undefined = useCountdown(startTime);
  return (
    <div>
      {countdown ? (
        <p>
          {countdown.minutes}:{countdown.seconds}
        </p>
      ) : (
        <BeatLoader />
      )}
    </div>
  );
};
