require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/s3K1Dke1mvtN3U2WtnGAx7PJtVH9rRKT',
      accounts: ['0ff62347bba2c4592ebf3b951c50a88519e1a8e31c3079d401be764f9b4d6362']
    }
  }
};

