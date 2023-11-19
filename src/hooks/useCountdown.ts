import { CountdownType } from "@/types";
import { padZero } from "@/utils";
import { useEffect, useState } from "react";

/**
 *
 * @param deadline ISO date timestamp of when event should occur
 * @param intervalTime Optional interval time, otherwise defaults to 500ms
 * @returns undefined until first calcTimeLeft has ran, then returns Countdown object
 */
export const useCountdown = (
  deadline: string,
  intervalTime?: number
): CountdownType | undefined => {
  const [timeLeft, setTimeLeft] = useState<CountdownType | undefined>(
    undefined
  );

  const calcTimeLeft = () => {
    const targetDate: Date = new Date(deadline);
    const time: number = targetDate.getTime() - Date.now();

    setTimeLeft({
      days: `${Math.floor(time / (1000 * 60 * 60 * 24))}`,
      hours: `${Math.floor((time / (1000 * 60 * 60)) % 24)}`,
      minutes: `${Math.floor((time / 1000 / 60) % 60)}`,
      seconds: padZero(Math.floor((time / 1000) % 60)),
    });
  };

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(
      () => calcTimeLeft(),
      intervalTime ?? 500
    );

    // todo: if 0 run callback to start game

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};
