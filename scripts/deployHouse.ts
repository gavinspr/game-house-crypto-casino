import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";

async function main() {
  const GameHouse: ContractFactory = await ethers.getContractFactory(
    "GameHouse"
  );
  const gameHouse: Contract = await GameHouse.deploy();

  await gameHouse.deployed();

  const token = await gameHouse.gameHouseToken();

  console.log(gameHouse.address, "New GameHouse Contract");
  console.log(token, "New GameHouse Token");

  // todo: script to ask if it should update envs
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
