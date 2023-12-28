const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });
// require('@nomiclabs/hardhat-etherscan');

async function main() {
  // Deploy LendingPoolAddressProviderRegistery contract
  const AaveOracleFactory = await ethers.getContractFactory("AaveOracle");
  const AaveOracleFactoryAddr = await AaveOracleFactory.deploy();

  const transaction = await AaveOracleFactoryAddr.deployed();
  console.log("AaveOracle deployed to:", AaveOracleFactoryAddr.address);


  // Wait for 5 confirmations
  await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

  //Verify the contract after deploying
  await run("verify", {
    address: AaveOracleFactoryAddr.address,
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




