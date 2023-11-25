// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

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

enum GameTypeStatus {
    Beta,
    Open,
    Paused,
    Closed
}

// todo:
// Governor,
// GovernorCountingSimple,
// GovernorVotes,
// GovernorVotesQuorumFraction,
// GovernorTimelockControl,
contract GameHouse is Dealer, Cashier {
    GameHouseToken public gameHouseToken = new GameHouseToken();

    // todo: comment
    uint256 private _maintenanceFee = 1; // Percent
    address private _maintenanceAddress;

    // todo: comment
    uint256 private _houseFee = 1; // Percent

    // todo: comment
    uint256 private _houseClaim = 50; // Percent

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
