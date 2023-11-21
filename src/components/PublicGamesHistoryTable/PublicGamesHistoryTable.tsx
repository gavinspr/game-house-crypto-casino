import React, { useEffect, useRef, useState } from "react";
import styles from "./PublicGamesHistoryTable.module.scss";
import { PublicGamesHistoryTableModeType as TableModeType } from "@/types";
import { faker } from "@faker-js/faker";
import { PINNED_ASSETS } from "@/constants";

// todo: attempt to preload blockchain data

type PropTypes = {
  tableMode: TableModeType;
};

// temp
type TableType = {
  game: string;
  player: string;
  time: string;
  token: string;
  payout: any;
};

export const PublicGamesHistoryTable = ({ tableMode }: PropTypes) => {
  const [tableData, setTableData] = useState<Array<TableType>>([]); // temp

  const initialDataRef = useRef<boolean>(true);

  // temp until ready with blockchain data
  const generateFakeData = () => {
    const newData = Array.from(
      { length: initialDataRef.current ? 25 : 1 },
      () => ({
        game: faker.helpers.arrayElement([
          "Texas Hold'em",
          "Blackjack",
          "Slots",
          "Dice",
          "Five Card Draw",
          "Roulette",
        ]),
        player: faker.finance.ethereumAddress(),
        time: `${faker.date.past().toISOString()}`,
        token: faker.helpers.arrayElement([
          "BTC",
          "ETH",
          "XMR",
          "USDT",
          "DAI",
          "GH",
        ]),
        payout: Math.random() < 0.5 ? 0 : faker.finance.amount(0, 1000),
      })
    );

    if (initialDataRef.current) initialDataRef.current = false;

    if (tableData.length > 100) {
      // Purge the oldest 75 elements
      setTableData((prev: Array<TableType>) => [
        ...prev.slice(-25),
        ...newData,
      ]);
    } else {
      setTableData((prev: Array<TableType>) => [...prev, ...newData]);
    }
  };

  useEffect(() => {
    generateFakeData();
    const interval: NodeJS.Timeout = setInterval(() => {
      generateFakeData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrap}>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Player</th>
            <th>Token</th>
            <th>Payout</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.slice(-25).map((row: TableType, index: number) => (
            <tr key={`${tableMode}-${index}`}>
              <td>{row.game}</td>
              <td>{`${row.player.slice(0, 5)}...${row.player.slice(-4)}`}</td>
              <td>
                <div className={styles.tokenDetails}>
                  <img
                    src={PINNED_ASSETS[row.token]}
                    alt=""
                    width={20}
                    height={20}
                  />
                  {row.token}
                </div>
              </td>
              <td>{row.payout}</td>
              <td>{row.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
