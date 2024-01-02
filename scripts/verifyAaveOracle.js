const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });
// require('@nomiclabs/hardhat-etherscan');

async function main() {

  let args = [
    ["0x25DF0268e34687daee94BCfCC3f136FCb9Ec0a7d", "0x6FB881CD2f7Df916b642A042bB1118191E867Eb6"],
    ["0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000"],
    "0xD3D0c00a4735731C398A2343AA34Fe9758de0827",
    "0xd67B4b05E3777C86b5BddF5Cf845FEB055Ec8230",
    "18"
  ];
  
  // Deploy LendingPoolAddressProviderRegistery contract
  const AaveOracleFactory = await ethers.getContractFactory("AaveOracle");
  const AaveOracleFactoryAddr = await AaveOracleFactory.deploy(...args);

  const transaction = await AaveOracleFactoryAddr.deployed();
  console.log("AaveOracle deployed to:", AaveOracleFactoryAddr.address);


  // Wait for 5 confirmations
  await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

  //Verify the contract after deploying
  await run("verify", {
    address: AaveOracleFactoryAddr.address,
    constructorArgument: args.flat(), // Update this if your constructor takes arguments
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




