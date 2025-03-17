import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ThemeBtnProps {
	lightMode: boolean;
	setLightMode: (mode: boolean) => void;
}

function ThemeBtn({ lightMode, setLightMode }: ThemeBtnProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className={`theme-panel ${open ? 'open' : ''}`}>
				<div className='theme-body'>
					<span>Change Theme</span>
					<div className='btn-group'>
						<button
							className={`switcher-btn ${lightMode ? '' : 'active'}`}
							onClick={() => setLightMode(true)}>
							Light
						</button>
						<button
							className={`switcher-btn ${lightMode ? 'active' : ''}`}
							onClick={() => setLightMode(false)}>
							Dark
						</button>
					</div>
					<button
						className='theme-tab'
						onClick={() => setOpen(!open)}>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				</div>
			</div>
		</>
	);
}
export default ThemeBtn;
