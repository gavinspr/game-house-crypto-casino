// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";
import "../house/GameHouse.sol";

contract GameHouseToken is ERC20, ERC20Permit, ERC20Votes {
    GameHouse private _house;

    // temp
    modifier onlyHouse() {
        require(msg.sender == address(_house), "Not Called By House");
        _;
    }

    constructor() ERC20("GameHouse", "GH") ERC20Permit("GameHouse") {
        _house = GameHouse(payable(msg.sender));
        _mint(msg.sender, 100 * 1e24); // 100 million
        // todo: other initial recipients ?
    }

    function houseBurn(uint256 amount) public {
        // todo: needs governance/AC
        _burn(address(_house), amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // The functions below are overrides required by Solidity for governance
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._update(from, to, amount);
    }

    function nonces(
        address owner
    ) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
