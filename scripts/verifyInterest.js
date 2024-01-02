const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args = ["0x736Ec893C3e654b554894E9De953995D32E60dbe", "1", "1", "1", "1", "1", "1"];

    // Deploy LendingPoolAddressProvider contract
    let DefaultReserveInterestRateStrategy = await ethers.getContractFactory("DefaultReserveInterestRateStrategy");
    const defaultReserveInterestRateStrategy = await DefaultReserveInterestRateStrategy.deploy(...args);

    const transaction = await defaultReserveInterestRateStrategy.deployed();
    console.log("defaultReserveInterestRateStrategy deployed to:", defaultReserveInterestRateStrategy.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: defaultReserveInterestRateStrategy.address,
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














