const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { PHRASE } = require('./config');

const provider = new HDWalletProvider(PHRASE, 'https://rinkeby.infura.io/v3/21e523b9f70746289fb86611a47d199e');
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	console.log(interface);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

	console.log('RES');

	console.log('Contract deployed to', result.options.address);
};
deploy();
