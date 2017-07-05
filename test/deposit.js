var PiggyBank = artifacts.require("./PiggyBank.sol");

contract('Project: PiggyBank automated test', function(accounts) {
  
  var coinbase  = accounts[0]; 
  var alice     = accounts[1];
  var bob       = accounts[2];
  var carol     = accounts[3];

  var owner = coinbase;

/*
Tests:
create contract
verify owner
deposit money
withdraw money
*/
 
  it("Owner should be the contract creator", function(done) {

      var bank = PiggyBank.deployed();

      bank.then (instance => instance.owner.call() ).then(
        function(value) {  
          assert.equal(value, coinbase, "Owner doesn't match!"); 
          done();
      })
      .catch(done);

  });

  it("Check savings goal", function(done) {

      var bank = PiggyBank.deployed();

      bank.then (instance => instance.savings_goal.call() ).then(
        function(value) {  
          assert.equal(value, 10, "Savings goal doesn't match!"); 
          done();
      })
      .catch(done);

  });


  it("Verify deposit() ", function(done) {

      var bank = PiggyBank.deployed();
      
      bank
      .then ( function(instance) {
        return instance.deposit({from: owner, value: web3.toWei(1, "ether")});
      })  
      .then ( function() {
        return bank;
      })
      .then ( function(instance) {
        return web3.eth.getBalance(instance.address);
      })
      .then ( function(value) {
        assert.equal(value.valueOf(), web3.toWei(1, "ether"), "Balance doesn't match!"); 
        done();
      })
      .catch(done);

  });


  it("Verify withdrawal()", function(done) {

      var bank = PiggyBank.deployed();
      
      bank
      .then ( function(instance) {
        return instance.deposit({from: owner, value: web3.toWei(9, "ether")});
      })  
      .then ( function() {
        return bank;
      })
      .then ( function(instance) {
        return instance.withdrawal( {from: owner} );
      })
      .then ( function() {
        return bank;
      })
      .then ( function(instance) {
        return web3.eth.getBalance(instance.address);
      })
      .then ( function(value) {
        assert.equal(value.valueOf(), web3.toWei(0, "ether"), "Balance doesn't match!"); 
        done();
      })
      .catch(done);

  });  


}); // contract

