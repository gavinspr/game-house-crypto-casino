// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./BaseGame.sol";

contract TexasHoldem is BaseGame {
    constructor() ERC721("Texas-Holdem", "TEXAS-HOLDEM") {}
}
