const { Web3, HttpProvider  }  = require('web3');
const fs = require('fs');
const { privateKeyToAccount } = require('web3-eth-accounts');
require('dotenv').config()

// Conectar a la red Rinkeby usando Infura

const web3 = new Web3(new HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_TOKEN}`));


// Leer el archivo JSON con ABI y Bytecode
const privateKey =  process.env.PRIVATE_KEY_WALLET;
const account = privateKeyToAccount(privateKey);
const contractData = JSON.parse(fs.readFileSync('./MyTokenERC20.json', 'utf8'));
const abi = contractData.abi;
const bytecode = contractData.bytecode;

async function deployContract() {

    const MyToken = new web3.eth.Contract(abi);
    console.log('Deploying contract...');
    const deployTx = MyToken.deploy({
        data: bytecode,
        arguments: ["MyToken", "MTK", 1000000] // Nombre, símbolo y suministro inicial
    });
    
    const gas = 1_000_000;
    
    const gasPrice = await web3.eth.getGasPrice();
    const data = deployTx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(account.address);

    const signedTx = await web3.eth.accounts.signTransaction({
        to: null,
        data,
        gas,
        gasPrice,
        nonce,
    }, privateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Contract deployed at address:', receipt.contractAddress);

}

deployContract();
