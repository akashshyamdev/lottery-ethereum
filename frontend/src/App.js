import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { useEffect, useState } from 'react';

function App() {
	const [players, setPlayers] = useState([]);
	const [manager, setManager] = useState(null);
	const [balance, setBalance] = useState(false);
	const [amount, setAmount] = useState(0);

	useEffect(() => {
		(async () => {
			const managerAddress = await lottery.methods.manager().call();
			const playersArr = await lottery.methods.getPlayers();
			const balanceAmt = await web3.eth.getBalance(lottery.options.address);

			setManager(managerAddress);
			setPlayers(playersArr);
			setBalance(balanceAmt);
		})();
	});

	console.log(manager);

	return (
		<div>
			<h2>Lottery</h2>
			<p>
				This is hosted by {manager}. There are currently {players.length} players competing for{' '}
				{web3.utils.fromWei(balance, 'ether')} ether
			</p>

			<hr />
			<form>
				<h4>Want To Try Your Luck?</h4>

				<div>
					<label htmlFor='ether'>Amount Of Ether</label>
					<input type='text' id='ether' value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>
			</form>
		</div>
	);
}

export default App;
