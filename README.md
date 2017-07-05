# PiggyBank - Answers

In the previous examples, “balance” was a state variable, now let’s send real ether to our contract

Make a PiggyBank.sol contract that accepts ether  and only pays out when a savings goal is reached
* Set savings goal in the constructor
* Make a payable deposit() function   
* Make a withdrawal() function that pays out only once goal is reached

Using the “User Accounts” example and the “Call a contract function” example, deposit ether to 
the PiggyBank from Alice’s account.  Withdraw once the savings goal is reached.

Bonus
withdrawal() only pays to the contract creator  (hint - truffle deploys from web3.eth.accounts[0] )

New concepts in this assignment:  tx.origin, msg.sender, address.send  
Reading: http://solidity.readthedocs.io/en/develop/units-and-global-variables.html
*/