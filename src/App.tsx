import { useState } from 'react';
import './App.css';
import ThemeBtn from './Components/ThemeBtn';
import Contact from './Components/Contact';
import Services from './Components/Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShip, faLink } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [cardSpin, setCardspin] = useState<boolean>(true);
	const [lightMode, setLightMode] = useState<boolean>(true);
	const [pause, setPause] = useState<boolean>(false);
	const [sites, setSites] = useState<boolean>(false);
	const [ship, setShip] = useState<boolean>(false);
	const [arrow, setArrow] = useState<boolean>(false);
	const [links, setLinks] = useState<boolean>(false);
	const [drag, setDrag] = useState<boolean>(false);
	const [contact, setContact] = useState<boolean>(false);
	const [services, setServices] = useState<boolean>(false);
	const [card, setCard] = useState(() => {
		const savedCard = localStorage.getItem('card');
		return savedCard ? JSON.parse(savedCard) : true;
	});
	const portfolio = [
		['Projects'],
		['Battleship', './battleship/index.html'],
		['GitHub', 'https://github.com/AlexRosario'],
		['LinkedIn', 'https://www.linkedin.com/in/alex-rosario-00523b98/'],
		['Services'],
		['Contact'],
	];
	const [active, setActive] = useState(true);
	const projects = [
		['Folio', 'https://folio-nine-eta.vercel.app/'],
		['Front', 'https://front-saas-7pl2ao77k-alexrosario.vercel.app/#pageTop'],
		['Code', 'https://coder-flax.vercel.app/'],
	];

	return (
		<>
			<div
				className={`landing-page${lightMode ? '' : ' night'}${pause ? ' pause' : ''}`}
				onClick={() => {
					setPause(!pause);
				}}>
				{card ? (
					<div
						className={`business-card ${cardSpin ? '' : 'flip'}${lightMode ? '' : ' night'}`}
						onClick={() => {
							setCardspin(!cardSpin);
							setTimeout(() => setCard(!card), 5100);
							localStorage.setItem(card, JSON.stringify(card));
						}}>
						<div className='name-container'>
							<h2>Alex Rosario</h2>
							<h6 className='click'> Click me!</h6>
						</div>
					</div>
				) : (
					<div className='menu'>
						{portfolio.map((item, index) => {
							return (
								<div className={`menu-item${item[0] == 'Projects' && sites ? ' list' : ''}`}>
									<a
										className={`${lightMode ? '' : ' night'}${item[0] == 'GitHub' && arrow ? ' git' : ''}${
											item[0] == 'LinkedIn' && drag ? ' drag' : ''
										}`}
										key={index}
										href={`${item[0] == 'GitHub' ? '#' : item[1] ? item[1] : undefined}`}
										onClick={(e) => {
											if (item[0] == 'GitHub') {
												e.preventDefault();
												setArrow(true);

												setTimeout(() => {
													window.open(item[1], '_blank');
													setTimeout(() => {
														setArrow(false);
													}, 1000);
												}, 1800);
											}
											if (item[0] == 'Projects') {
												e.preventDefault();
											}
											if (item[0] == 'LinkedIn') {
												e.preventDefault();
												setDrag(true);

												setTimeout(() => {
													window.open(item[1], '_blank');
													setTimeout(() => {
														setDrag(false);
													}, 1000);
												}, 2000);
											}
											if (item[0] == 'Services') {
												e.preventDefault();
												setServices(true);
											}
											if (item[0] == 'Contact') {
												e.preventDefault();
												setContact(true);
											}
										}}
										onMouseEnter={() => {
											item[0] == 'Projects' ? setSites(true) : setSites(false);
											item[0] == 'Battleship' ? setShip(true) : setShip(false);
											item[0] == 'LinkedIn' ? setLinks(true) : setLinks(false);
										}}
										onMouseLeave={() => {
											setShip(false);
											setLinks(false);
										}}
										target='_blank'
										rel='noopener noreferrer'>
										{item[0]}
									</a>
								</div>
							);
						})}
					</div>
				)}
				{sites && (
					<div
						className='project-list'
						tabIndex={0}
						onMouseLeave={() => {
							setSites(false);
							setActive(true);
						}}>
						{projects.map((project, projectIndex) => (
							<a
								key={projectIndex}
								className={`site-preview ${active && projectIndex == 0 ? ' active' : ''}${lightMode ? '' : ' night'}`}
								onMouseLeave={() => {
									setActive(false);
								}}
								href={project[1]}
								target='_blank'
								rel='noopener noreferrer'
								style={{ display: 'block', padding: '5px' }}>
								{project[0]}
							</a>
						))}
					</div>
				)}
				{ship && (
					<div className='ship-container'>
						<FontAwesomeIcon
							icon={faShip}
							className={`ship${lightMode ? '' : ' night'}`}
						/>
					</div>
				)}
				{links && (
					<FontAwesomeIcon
						icon={faLink}
						className={`link${lightMode ? '' : ' night'}${drag ? ' drag' : ''}`}
					/>
				)}
				{contact && (
					<Contact
						lightMode={lightMode}
						setContact={() => setContact(false)}
					/>
				)}
				{services && (
					<Services
						lightMode={lightMode}
						setServices={() => setServices(false)}
					/>
				)}
			</div>
			<ThemeBtn
				lightMode={lightMode}
				setLightMode={setLightMode}
			/>
		</>
	);
}

export default App;
