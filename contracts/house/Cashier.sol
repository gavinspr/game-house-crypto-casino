// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract Cashier {
    function fundLottery(uint256 amount, address tokenContract) external {
        // todo: AC
        // todo: Cron/timelock
        // todo: need to sell GH funds for GHTokens
        // todo: needs to send GH Tokens to lottery pool
    }
}
