const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let arg1 = 'MATIC';
    // Deploy LendingPoolAddressProvider contract
    const LendingPoolAddressProvider = await ethers.getContractFactory("LendingPoolAddressesProvider");
    const lendingPoolAddressProvider = await LendingPoolAddressProvider.deploy(arg1);

    const transaction = await lendingPoolAddressProvider.deployed();
    console.log("LendingPoolAddressesProvider deployed to:", lendingPoolAddressProvider.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: lendingPoolAddressProvider.address,
        constructorArgument: arg1,
    });
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
