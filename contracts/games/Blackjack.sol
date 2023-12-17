// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RunningGame.sol"; 

contract Blackjack is RunningGame {
    constructor(
        address house
    ) Ownable(house) ERC721("Blackjack", "BLACKJACK") {

    }

    // ! dealer must stand at 17+;; dealer has to hit until 17+

    // todo: getRandomDeck

    function initiateGame() external // todo: params
    {
        // todo: needs AC
        // todo: deal cards to players and dealer
    }

    // todo: min, max bets,, where to put?
    // todo: a blackjack/21 pays out 3:1; regular win pays out 2:1

    function hit() external {}

    function stay() external {}


    function split() external {
        // ! can only be done with pairs; ? do they have to bet again
    }

    function bet() external {}

    function doubleDown() external {}

    function bust() private {}

    function win() private {}

    function lose() private {}

    function endGame() private {}
}
