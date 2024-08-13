const { Web3, HttpProvider  }  = require('web3');
const fs = require('fs');
require('dotenv').config()

// Conectar a la red Rinkeby usando Infura
const web3 = new Web3(new HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_TOKEN}`));

// Leer el archivo JSON con ABI
const contractData = JSON.parse(fs.readFileSync('./MyTokenERC20.json', 'utf8'));
const abi = contractData.abi;

const contractAddress = '0x05f739ba246b023b41cfbca902c5c9eccc0ea6f1'; // Dirección del contrato desplegado

const tokenContract = new web3.eth.Contract(abi, contractAddress);

async function getTokenName() {
    const name = await tokenContract.methods.name().call();
    console.log('Token Name:', name);
}

async function getTotalSupply() {
    const totalSupply = await tokenContract.methods.totalSupply().call();
    console.log('Total Supply:', totalSupply);
}

getTokenName();
getTotalSupply();