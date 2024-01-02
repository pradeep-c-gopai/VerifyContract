const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args = ["0xD410a6171F08BfB6E22e8FAdFC254C4598FaA335", "0x736Ec893C3e654b554894E9De953995D32E60dbe"];

    // Deploy LendingPoolAddressProvider contract
    let StableAndVariableTokensHelper = await ethers.getContractFactory("StableAndVariableTokensHelper");
    const stableAndVariableTokensHelper = await StableAndVariableTokensHelper.deploy(...args);

    const transaction = await stableAndVariableTokensHelper.deployed();
    console.log("stableAndVariableTokensHelper deployed to:", stableAndVariableTokensHelper.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: stableAndVariableTokensHelper.address,
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














