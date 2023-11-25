// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./BaseGame.sol";

contract Blackjack is BaseGame {
    constructor() ERC721("Blackjack", "BLACKJACK") {}
}
