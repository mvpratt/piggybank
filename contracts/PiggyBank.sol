pragma solidity ^0.4.8;


contract PiggyBank {

    address public owner;
    uint public savings_goal;

	function PiggyBank() {
		owner = tx.origin;   // external account that created the contract
		savings_goal = 10;
	}

	function deposit() payable {
		// bonus - only accept if its from owner

	}

	function withdrawal() returns(bool success) {
		if (msg.sender == owner && this.balance >= savings_goal) {
			success = msg.sender.send(this.balance);
			return success;
		}
	}
}

