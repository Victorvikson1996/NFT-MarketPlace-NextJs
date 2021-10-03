require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

// const fs = require("fs")
// const privateKey = fs.readFileSync(".secret").toString()
// const projectId = "0f44cdad5f534c5591a1e17d01031269"



module.exports = {

  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: process.env.STAGING_MUMBAI_KEY,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.STAGING_MAINNET_KEY,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  solidity: "0.8.4",
};
