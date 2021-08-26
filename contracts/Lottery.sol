// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Lottery {
	address public manager;
	address[] public players;

	constructor() {
		manager = msg.sender;
	}

	function enter() public payable {
		require(msg.value > .1 ether, 'Send at least 0.1 ether.');

		players.push(msg.sender);
	}

	function random() private view returns (uint256) {
		return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
	}
}
