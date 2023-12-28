const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args ="0xA49D42439431176EC0d42536CFbb139d6f19b19a";

    // Deploy LendingPoolAddressProvider contract
    let AaveProtocolDataProvider = await ethers.getContractFactory("AaveProtocolDataProvider");
    const aaveProtocolDataProvider = await AaveProtocolDataProvider.deploy(args);

    const transaction = await aaveProtocolDataProvider.deployed();
    console.log("aaveProtocolDataProvider deployed to:", aaveProtocolDataProvider.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: aaveProtocolDataProvider.address,
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














