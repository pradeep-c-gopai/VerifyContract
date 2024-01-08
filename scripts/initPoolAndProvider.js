const { ethers } = require("hardhat");

require("dotenv").config({ path: ".env" });

async function initializePoolAndProvider() {

    const lendingPoolAddress = "0x234305b70059E2855223fad9cb0086F863530074";

    const lendingPoolAddressProviderAddress = "0x66Fbb7c2337b27C97cB14B5E81165Be7aF228621";

    const lendingPoolFactory = await ethers.getContractFactory("LendingPool", {
        libraries: {
            ReserveLogic: "0x292aa21301eCcF78A547E1F07f20F4e782a8a9ab",
            ValidationLogic: "0xb5E20439Dd8C1CC241b6Dd54B730184af49655F8",
        },
    });

    const lendingPoolContract = await lendingPoolFactory.attach(lendingPoolAddress);

    const initializeProviderInPoolTx = await lendingPoolContract.initialize(lendingPoolAddressProviderAddress);

    await initializeProviderInPoolTx.wait();

    console.log("Initailized Address Provider in Lending Pool Implementation contract");

    const lendingPoolAddressProviderFactory = await ethers.getContractFactory("LendingPoolAddressesProvider");

    const lendingPoolAddressProviderContract = await lendingPoolAddressProviderFactory.attach(lendingPoolAddressProviderAddress);

    const setLendingPoolImplTx = await lendingPoolAddressProviderContract.setLendingPoolImpl(lendingPoolAddress);

    await setLendingPoolImplTx.wait();

    console.log("Lending Pool has been set in Provider, and a proxy contract for Lending Pool is createds");

}

initializePoolAndProvider()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
