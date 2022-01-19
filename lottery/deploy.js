const HdWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const secret = require('./secret.json');
// var secret = JSON.parse(secretFile);

// use test wallet
const provider = new HdWalletProvider(
  secret['wallet_mnemonic'],
  'https://kovan.infura.io/v3/af38ea05790c4aa49921ecf37bd84b34'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log(interface);
  console.log('Contract deployed to', result.options.address);
};
deploy();
