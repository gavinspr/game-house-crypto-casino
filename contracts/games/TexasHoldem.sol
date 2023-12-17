// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RunningGame.sol";

contract TexasHoldem is RunningGame {
    constructor(
        address house
    ) Ownable(house) ERC721("Texas-Holdem", "TEXAS-HOLDEM") {}
}
