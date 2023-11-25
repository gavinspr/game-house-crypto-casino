// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./IRunningGameMetadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

abstract contract BaseGame is ERC721URIStorage, IRunningGameMetadata {
    uint256 private _runningGameIdCounter;

    mapping(uint256 => RunningGameMetadata) private _runningGameMetadata;

    function mintRunningGame(address receiver) public {
        // todo: needs AC
        _safeMint(receiver, _runningGameIdCounter++);

        // todo: emit
    }

    function updateRunningGameStatus(
        uint256 runningGameId,
        RunningGameStatus newStatus
    ) public {
        // todo: needs AC
        _runningGameMetadata[runningGameId].status = newStatus;

        // todo: emit
    }

    function closeRunningGame(
        uint256 runningGameId,
        string calldata endedAt,
        RunningGameResults calldata results
    ) public {
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
    ) public {
        // todo: needs AC

        _setTokenURI(runningGameId, _runningGameURI);
    }
}
