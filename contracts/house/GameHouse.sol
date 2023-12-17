// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/governance/utils/IVotes.sol";
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "../token/GameHouseToken.sol";
import "./Cashier.sol";
import "./Dealer.sol";

// todo:
// Governor,
// GovernorCountingSimple,
// GovernorVotes,
// GovernorVotesQuorumFraction,
// GovernorTimelockControl,
contract GameHouse is Dealer, Cashier {
    enum GameTypeStatus {
        Beta,
        Open,
        Paused,
        Closed
    }

    GameHouseToken public gameHouseToken = new GameHouseToken();
    // GameHouseLottery public gameHouseLottery = new GameHouseLottery(); // todo

    /**
     * This only applies to player wins
     * This will be collected when a player collects their winnings
     * All tokens collected by the house are used for the purpose of increasing the size of payout pools for players
     * As well as any future DAO decisions that could be made about the house funds by GH DAO token holders
     * The DAO can vote to increase or decrease it with a proposal
     */
    uint256 private _houseFee = 1; // Percent

    /**
     * This only applies to player losses
     * Tokens that are lost in games will be split between the house and players bankrolling that game, as well as the maintenanceFee if there is one
     * All tokens collected by the house are used for the purpose of increasing the size of payout pools for players
     * As well as any future DAO decisions that could be made about the house funds by GH DAO token holders
     * Ideally the _houseClaim is initially set high to allow the payout pools to accumulate tokens
     * As time progresses the DAO can vote to decrease this to raise the payout to the bankrolling players
     */
    uint256 private _houseClaim = 75; // Percent

    /**
     * This only applies to player losses
     * These tokens are sent to the contract deployer (aka the developer) for the purpose of maintaining and developing the project
     * The DAO can vote to increase or decrease it with a proposal
     */
    uint256 private _maintenanceFee = 2; // Percent
    address private _maintenanceAddress;

    /** gameTypeAddress => status */
    mapping(address => GameTypeStatus) private _gameTypeStatus;

    // todo:
    constructor() // IVotes _token,
    // TimelockController _timelock
    // Governor("MyGovernor")
    // GovernorVotes(_token)
    // GovernorVotesQuorumFraction(4)
    // GovernorTimelockControl(_timelock)
    {
        _maintenanceAddress = msg.sender;
    }

    // ----------------------------------------------------------------------
    // function votingDelay() public pure override returns (uint256) {
    //     return 7200; // 1 day
    // }

    // function votingPeriod() public pure override returns (uint256) {
    //     return 50400; // 1 week
    // }

    // function proposalThreshold() public pure override returns (uint256) {
    //     return 0;
    // }

    // The functions below are overrides required by Solidity.

    // function state(
    //     uint256 proposalId
    // )
    //     public
    //     view
    //     override(Governor, GovernorTimelockControl)
    //     returns (ProposalState)
    // {
    //     return super.state(proposalId);
    // }

    // function proposalNeedsQueuing(
    //     uint256 proposalId
    // )
    //     public
    //     view
    //     virtual
    //     override(Governor, GovernorTimelockControl)
    //     returns (bool)
    // {
    //     return super.proposalNeedsQueuing(proposalId);
    // }

    // function _queueOperations(
    //     uint256 proposalId,
    //     address[] memory targets,
    //     uint256[] memory values,
    //     bytes[] memory calldatas,
    //     bytes32 descriptionHash
    // ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
    //     return
    //         super._queueOperations(
    //             proposalId,
    //             targets,
    //             values,
    //             calldatas,
    //             descriptionHash
    //         );
    // }

    // function _executeOperations(
    //     uint256 proposalId,
    //     address[] memory targets,
    //     uint256[] memory values,
    //     bytes[] memory calldatas,
    //     bytes32 descriptionHash
    // ) internal override(Governor, GovernorTimelockControl) {
    //     super._executeOperations(
    //         proposalId,
    //         targets,
    //         values,
    //         calldatas,
    //         descriptionHash
    //     );
    // }

    // function _cancel(
    //     address[] memory targets,
    //     uint256[] memory values,
    //     bytes[] memory calldatas,
    //     bytes32 descriptionHash
    // ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
    //     return super._cancel(targets, values, calldatas, descriptionHash);
    // }

    // function _executor()
    //     internal
    //     view
    //     override(Governor, GovernorTimelockControl)
    //     returns (address)
    // {
    //     return super._executor();
    // }

    // ----------------------------------------------------------------

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function setMaintenanceFee(uint256 newFee) external {
        // todo: needs governance
        _maintenanceFee = newFee;
    }

    function setHouseFee(uint256 newFee) external {
        // todo: needs governance
        _houseFee = newFee;
    }

    function setHouseClaim(uint256 newClaim) external {
        // todo: needs governance
        _houseClaim = newClaim;
    }

    function setMaintenanceAddress(address newAddress) external {
        // todo: needs governance
        _maintenanceAddress = newAddress;
    }

    function fetchGameTypeStatus(
        address gameTypeAddress
    ) public view returns (GameTypeStatus) {
        return _gameTypeStatus[gameTypeAddress];
    }

    function setGameTypeStatus(
        address gameTypeAddress,
        GameTypeStatus newStatus
    ) external {
        // todo: needs AC
        _gameTypeStatus[gameTypeAddress] = newStatus;
    }
}
