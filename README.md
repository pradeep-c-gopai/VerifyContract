# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


### ADD in README
```
ALCHEMY_API_KEY_URL="https://dashboard.alchemy.com/"
MUMBAI_PRIVATE_KEY="YOUR_PRIAVTE_KEY"
POLYGONSCAN_KEY="https://polygonscan.com/myapikey"
```

### To run deploy and verify script
```
npx hardhat run scripts/verifyProvider.js --network mumbai
```

### To verify through CLI
```
npx hardhat verify --network mumbai 0x1a5f55A3778DC87aBdb587ac3c93Fb3357Dcd0fb "MATIC"
```
