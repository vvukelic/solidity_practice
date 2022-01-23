const HdWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');
const secret = require('./secret.json');

// use test wallet
const provider = new HdWalletProvider(
  secret['wallet_mnemonic'],
  'https://kovan.infura.io/v3/af38ea05790c4aa49921ecf37bd84b34'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};
deploy();
