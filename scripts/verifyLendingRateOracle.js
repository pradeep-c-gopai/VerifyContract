const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });
// require('@nomiclabs/hardhat-etherscan');

async function main() {
  // Deploy LendingPoolAddressProviderRegistery contract
  const LendingRateOracleFactory = await ethers.getContractFactory("LendingRateOracle");
  const LendingRateOracleFactoryAddr = await LendingRateOracleFactory.deploy();

  const transaction = await LendingRateOracleFactoryAddr.deployed();
  console.log("LendingRateOracle deployed to:", LendingRateOracleFactoryAddr.address);


  // Wait for 5 confirmations
  await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

  //Verify the contract after deploying
  await run("verify", {
    address: LendingRateOracleFactoryAddr.address,
    constructorArguments: [], // Update this if your constructor takes arguments
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




