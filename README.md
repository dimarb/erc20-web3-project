# erc20-web3-project

**Description:** Deploy and interact with an ERC-20 smart contract using Web3.

1. Clone the project.
2. Create an environment file `.env` by copying `.envExample` as `.env` and setting the following values:
   - **INFURA_TOKEN:** Go to Infura and create a new token for the Sepolia testnet.
   - **PRIVATE_KEY_WALLET:** Your private key used to send transactions on the Sepolia testnet.
3. Use a Sepolia faucet to fund your account.

To deploy the contract, run:

```bash
node deploy.js
