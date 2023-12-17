import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import "dotenv/config";

// todo: pass contract as arg ?

async function main() {
  const Game: ContractFactory = await ethers.getContractFactory("Blackjack");
  const game: Contract = await Game.deploy(process.env.GAMEHOUSE_ADDRESS);

  await game.deployed();

  console.log(game.address, "New Game Contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
