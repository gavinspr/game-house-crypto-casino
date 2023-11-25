// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IRunningGameMetadata {
    enum RunningGameStatus {
        Open,
        Closed,
        Stopped
    }

    struct RunningGameResults {
        string resultDetails; // stringified JSON
        address winner;
    }

    struct RunningGameMetadata {
        uint256 id;
        string createdAt;
        string startedAt;
        string endedAt;
        RunningGameStatus status;
        string gameType;
        string gameToken;
        RunningGameResults results;
    }

    event RunningGameCreated(uint256 indexed runningGameId);

    event RunningGameStatusChanged(
        uint256 indexed runningGameId,
        RunningGameStatus status
    );

    event RunningGameWon(uint256 indexed runningGameId, address winner);
}
