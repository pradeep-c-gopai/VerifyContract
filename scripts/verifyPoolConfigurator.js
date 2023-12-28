const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });
// require('@nomiclabs/hardhat-etherscan');

async function main() {
  // Deploy LendingPoolAddressProviderRegistery contract
  const LendingPoolConfigurator = await ethers.getContractFactory("LendingPoolConfigurator");
  const LendingPoolConfiguratorAddr = await LendingPoolConfigurator.deploy();

  const transaction = await LendingPoolConfiguratorAddr.deployed();
  console.log("LendingPoolConfigurator deployed to:", LendingPoolConfiguratorAddr.address);


  // Wait for 5 confirmations
  await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

  //Verify the contract after deploying
  await run("verify", {
    address: LendingPoolConfiguratorAddr.address,
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



//----------------------------------------------------------------------------
// const { ethers, run } = require("hardhat");
// require("dotenv").config({ path: ".env" });
// require('@nomiclabs/hardhat-etherscan');

// async function main() {
//   // Deploy LendingPoolAddressProviderRegistery contract
//   const LendingPoolAddressProviderRegistery = await ethers.getContractFactory("LendingPoolAddressesProviderRegistry");
//   const lendingPoolAddressProviderRegistery = await LendingPoolAddressProviderRegistery.deploy();

//   await lendingPoolAddressProviderRegistery.deployed();
//   console.log("LendingPoolAddressProviderRegistery deployed to:", lendingPoolAddressProviderRegistery.address);

//   // Verify the contract after deploying
//   await run("verify", {
//     address: lendingPoolAddressProviderRegistery.address,
//     constructorArguments: [], // Update this if your constructor takes arguments
//   });
// }

// // Call the main function and catch if there is any error
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
