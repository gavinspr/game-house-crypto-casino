// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IRunningGameMetadata.sol";
import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

abstract contract RunningGame is
    Ownable,
    ERC721URIStorage,
    IRunningGameMetadata
{
    uint256 private _runningGameIdCounter;

    mapping(uint256 => RunningGameMetadata) private _runningGameMetadata;

    function mintRunningGame(string calldata token) external onlyOwner {
        uint256 newGameId = _runningGameIdCounter;

        _safeMint(owner(), _runningGameIdCounter++);

        RunningGameMetadata storage g = _runningGameMetadata[newGameId];
        g.id = newGameId;
        g.status = RunningGameStatus.Queuing;
        g.gameToken = token;

        emit RunningGameCreated(newGameId);
    }

    function getGameMetadata(
        uint256 runningGameId
    ) external view returns (RunningGameMetadata memory) {
        return _runningGameMetadata[runningGameId];
    }

    function updateRunningGameStatus(
        uint256 runningGameId,
        RunningGameStatus newStatus
    ) external {
        // todo: needs AC
        _runningGameMetadata[runningGameId].status = newStatus;

        // todo: emit
    }

    function closeRunningGame(
        uint256 runningGameId,
        string calldata endedAt,
        RunningGameResults calldata results
    ) external {
        // todo: needs AC

        RunningGameMetadata storage g = _runningGameMetadata[runningGameId];
        g.endedAt = endedAt;
        g.status = RunningGameStatus.Closed;
        g.results = results; // ! not sure how this will look in the end yet

        // todo: emit
    }

    function setGameURI(
        uint256 runningGameId,
        string calldata _runningGameURI
    ) external {
        // todo: needs AC

        _setTokenURI(runningGameId, _runningGameURI);
    }
}
