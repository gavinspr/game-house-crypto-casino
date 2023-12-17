// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Dealer$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Dealer",
  "sourceName": "contracts/house/Dealer.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gameTypeAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "runningGameId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "gameURI",
          "type": "string"
        }
      ],
      "name": "closeRunningGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gameTypeAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "runningGameId",
          "type": "uint256"
        }
      ],
      "name": "getGameURI",
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
          "internalType": "address",
          "name": "gameTypeAddress",
          "type": "address"
        },
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
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "gameTypeAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "runningGameId",
          "type": "uint256"
        },
        {
          "internalType": "enum IRunningGameMetadata.RunningGameStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "updateRunningGameStatus",
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
    contractName: "Dealer",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Dealer$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/house/Dealer.sol:Dealer",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Dealer$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Dealer",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Dealer$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/house/Dealer.sol:Dealer",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Dealer$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Dealer",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Dealer$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/house/Dealer.sol:Dealer",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Dealer$Type["abi"]>>;
}
