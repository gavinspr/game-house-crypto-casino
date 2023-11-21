import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./LeaderboardView.module.scss";
import { Toggle } from "../Toggle/Toggle";
import { PublicGamesHistoryTable } from "../PublicGamesHistoryTable/PublicGamesHistoryTable";
import { PublicGamesHistoryTableModeType as TableModeType } from "@/types";

export const LeaderboardView = () => {
  const [tableMode, setTableMode] = useState<TableModeType>("Leaderboard");

  return (
    <div className={styles.wrap}>
      <Toggle
        id="leaderboard-table"
        options={["Leaderboard", "Recently Played"]}
        toggleHandler={setTableMode as Dispatch<SetStateAction<string>>}
      />
      <PublicGamesHistoryTable tableMode={tableMode} />
    </div>
  );
};
