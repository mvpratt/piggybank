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
        //web3.eth.sendTransaction( {from: owner, to: instance.address, value: web3.toWei(1,"ether")} ); 
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



/*
var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    return MetaCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var meta;
    var metaCoinBalance;
    var metaCoinEthBalance;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      metaCoinBalance = outCoinBalance.toNumber();
      return meta.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      metaCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});*/
