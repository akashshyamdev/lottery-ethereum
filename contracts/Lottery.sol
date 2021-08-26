// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract Lottery {
	address public manager;
	address payable[] public players;

	constructor() {
		manager = msg.sender;
	}

	function enter() public payable {
		require(msg.value > .1 ether, 'Send at least 0.1 ether.');

		players.push(payable(msg.sender));
	}

	function random() private view returns (uint256) {
		return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
	}

	function pickWinner() public restricted {
		uint256 index = random() % players.length;
		players[index].transfer(address(this).balance);

		players = new address payable[](0);
	}

	function getAllPlayers() public view returns (address payable[] memory) {
		return players;
	}

	modifier restricted() {
		require(msg.sender == manager, 'Only the manager can pick a winner');
		_;
	}
}
