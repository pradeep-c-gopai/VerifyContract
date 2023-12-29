const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args = [];

    // Deploy LendingPoolAddressProvider contract
    let PriceOracle = await ethers.getContractFactory("PriceOracle");
    const priceOracle = await PriceOracle.deploy(...args);

    const transaction = await priceOracle.deployed();
    console.log("priceOracle deployed to:", priceOracle.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: priceOracle.address,
        constructorArgument: args,
    });
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });














