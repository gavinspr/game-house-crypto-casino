import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
import "hardhat-contract-sizer";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    telosTest: {
      url: "https://testnet.telos.net/evm",
      chainId: 41,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
    bscTest: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
      chainId: 0x61,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
};

export default config;
