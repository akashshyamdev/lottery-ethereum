import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
	const [players, setPlayers] = useState([]);
	const [manager, setManager] = useState(null);
	const [balance, setBalance] = useState(false);
	const [amount, setAmount] = useState(0);
	const [message, setMessage] = useState('');

	useEffect(() => {
		(async () => {
			const managerAddress = await lottery.methods.manager().call();
			const playersArr = await lottery.methods.getPlayers().call();
			const balanceAmt = await web3.eth.getBalance(lottery.options.address);

			setManager(managerAddress);
			setPlayers(playersArr);
			setBalance(balanceAmt);
		})();
	});

	const enter = async (e) => {
		e.preventDefault();

		setMessage('Entering lottery...');
		const accounts = await web3.eth.getAccounts();
		await lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });

		setMessage('Entered lottery successfully!');
	};

	const onClick = async (e) => {
		e.preventDefault();

		setMessage('Picking winner...');
		const accounts = await web3.eth.getAccounts();

		await lottery.methods.pickWinner().send({ from: accounts[0] });

		setMessage('Picked Winner!!!');
	};

	return (
		<div>
			<h2>Lottery</h2>

			<p>
				This is hosted by {`${manager}`}. There are currently {players.length} players competing for {''}
				{balance} ether
			</p>

			<hr />

			<form onSubmit={enter}>
				<h4>Want To Try Your Luck?</h4>

				<div>
					<label htmlFor='ether'>Amount Of Ether</label>
					<input type='text' id='ether' value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>

				<button>Enter</button>
			</form>

			<hr />

			<h4>Ready To Pick A Winner?</h4>
			<button onClick={onClick}>Pick Winner</button>

			<p>{message}</p>
		</div>
	);
}

export default App;
