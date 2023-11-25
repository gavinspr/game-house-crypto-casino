// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../games/IRunningGameMetadata.sol";

interface IGame {
    function mintRunningGame() external;

    function tokenURI(uint256 runningGameId) external returns (string memory);

    function updateRunningGameState(
        uint256 gameId,
        IRunningGameMetadata.RunningGameStatus newStatus
    ) external;

    function setGameURI(
        uint256 runningGameId,
        string calldata _tokenURI
    ) external;
}

abstract contract Dealer is IERC721Receiver {
    function mintRunningGame(address gameTypeAddress) public {
        // todo: needs AC
        return IGame(gameTypeAddress).mintRunningGame();
    }

    function updateRunningGameStatus(
        address gameTypeAddress,
        uint256 runningGameId,
        IRunningGameMetadata.RunningGameStatus newStatus
    ) public {
        // todo: needs AC
        IGame(gameTypeAddress).updateRunningGameState(runningGameId, newStatus);
    }

    function closeRunningGame(
        address gameTypeAddress,
        uint256 runningGameId,
        string calldata gameURI
    ) public {
        // todo: needs AC
        return IGame(gameTypeAddress).setGameURI(runningGameId, gameURI);
    }

    function getGameURI(
        address gameTypeAddress,
        uint256 runningGameId
    ) public returns (string memory) {
        return IGame(gameTypeAddress).tokenURI(runningGameId);
    }
}
