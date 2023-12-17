// This file was autogenerated by hardhat-viem, do not edit it.
// prettier-ignore
// tslint:disable
// eslint-disable

import type { Address } from "viem";
import type { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import "@nomicfoundation/hardhat-viem/types";

export interface Cashier$Type {
  "_format": "hh-sol-artifact-1",
  "contractName": "Cashier",
  "sourceName": "contracts/house/Cashier.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "tokenContract",
          "type": "address"
        }
      ],
      "name": "fundLottery",
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
    contractName: "Cashier",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Cashier$Type["abi"]>>;
  export function deployContract(
    contractName: "contracts/house/Cashier.sol:Cashier",
    constructorArgs?: [],
    config?: DeployContractConfig
  ): Promise<GetContractReturnType<Cashier$Type["abi"]>>;

  export function sendDeploymentTransaction(
    contractName: "Cashier",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Cashier$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;
  export function sendDeploymentTransaction(
    contractName: "contracts/house/Cashier.sol:Cashier",
    constructorArgs?: [],
    config?: SendDeploymentTransactionConfig
  ): Promise<{
    contract: GetContractReturnType<Cashier$Type["abi"]>;
    deploymentTransaction: GetTransactionReturnType;
  }>;

  export function getContractAt(
    contractName: "Cashier",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Cashier$Type["abi"]>>;
  export function getContractAt(
    contractName: "contracts/house/Cashier.sol:Cashier",
    address: Address,
    config?: GetContractAtConfig
  ): Promise<GetContractReturnType<Cashier$Type["abi"]>>;
}