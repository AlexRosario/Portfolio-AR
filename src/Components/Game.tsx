const GameEmbed = () => {
	return (
		<div>
			<iframe
				src='http://localhost:3001/battleship/index.html'
				width='1000'
				height='600'
				style={{ border: 'none' }}
				title='Game'></iframe>
		</div>
	);
};

export default GameEmbed;
