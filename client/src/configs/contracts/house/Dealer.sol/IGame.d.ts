// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface IGame$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "IGame",
  "sourceName": "contracts/house/Dealer.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "token",
          "type": "string"
        }
      ],
      "name": "mintRunningGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "runningGameId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_tokenURI",
          "type": "string"
        }
      ],
      "name": "setGameURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "runningGameId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "enum IRunningGameMetadata.RunningGameStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "updateRunningGameState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

declare module "@nomicfoundation/hardhat-viem/types" {
  export function deployContract(
    contractName: "IGame",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IGame$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/house/Dealer.sol:IGame",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<IGame$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "IGame",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IGame$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/house/Dealer.sol:IGame",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<IGame$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "IGame",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IGame$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/house/Dealer.sol:IGame",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<IGame$Type["abi"]>>;
}
