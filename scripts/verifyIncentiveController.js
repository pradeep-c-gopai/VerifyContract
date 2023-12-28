const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args = ["0x9F03DC0D6473A102C7454A81BE0243f05622ca52", "0x6443E9F7282c27C517e61cF938cfe17Ba376E0EF"];

    // Deploy LendingPoolAddressProvider contract
    let AaveIncentiveController = await ethers.getContractFactory("AaveIncentivesController");
    const aaveIncentiveController = await AaveIncentiveController.deploy(...args);

    const transaction = await aaveIncentiveController.deployed();
    console.log("AaveIncentiveController deployed to:", aaveIncentiveController.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: aaveIncentiveController.address,
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
