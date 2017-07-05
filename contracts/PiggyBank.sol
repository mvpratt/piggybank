pragma solidity ^0.4.8;

/*
In the previous examples, “balance” was a state variable, now let’s send real ether to our contract

Make a PiggyBank.sol contract that accepts ether  and only pays out when a threshodl is reached
Make a payable deposit() function   
Set threshold in the constructor
Make a withdrawal() function that pays out only once threshold is reached

Using the “User Accounts” example and the “Call a contract function” example, deposit ether to 
the PiggyBank from Alice’s account.  Withdraw once the savings threshold is reached.

Bonus
withdrawal() only pays to the contract creator  (hint - truffle deploys from web3.eth.accounts[0] )

New concepts in this assignment:  tx.origin, msg.sender, address.send  
Reading: http://solidity.readthedocs.io/en/develop/units-and-global-variables.html
*/


contract PiggyBank {

    address public owner;
    uint public savings_goal;

	function PiggyBank(uint goal) {
		owner = tx.origin;   // external account that created the contract
		savings_goal = 10;
	}

	function deposit() payable {
		// only accept if its from owner

	}

	function withdrawal() returns(bool success) {
		if (msg.sender == owner && this.balance >= savings_goal) {
			success = msg.sender.send(this.balance);
			return success;
		}
	}
}

