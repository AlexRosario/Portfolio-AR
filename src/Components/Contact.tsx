import '../App.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface ContactProps {
	setContact: () => void;
	lightMode: boolean;
}

function Contact({ setContact, lightMode }: ContactProps) {
	return (
		<div
			id='contact'
			className={`${lightMode ? '' : ' night'}`}>
			<div className='container-fluid'>
				<header className='modal-header'>
					<h3 className={`page-header${lightMode ? '' : ' night'}`}>Contact</h3>
					<FontAwesomeIcon
						icon={faTimes}
						className='exit-btn'
						onClick={() => setContact()}
					/>
				</header>
				<div className='modal-body'>
					<div className='contact-text'>
						<h5 className='header-medium'>Alex Rosario</h5>
						<div>Have a project or question? Send me a message</div>
						<div>I will reply within 48 hours.</div>
					</div>
					<form className='folio-form'>
						<input
							className='form-ctrl'
							name='name'
							type='text'
							placeholder='Name'
						/>
						<input
							className='form-ctrl'
							name='email'
							type='email'
							placeholder='Email'
						/>
						<input
							className='form-ctrl'
							name='subject'
							type='text'
							placeholder='Subject'
						/>
						<textarea
							className='form-ctrl'
							name='message'
							id=''
							cols={30}
							rows={3}
							placeholder='Write your message...'></textarea>
						<input
							type='submit'
							value='Send'
							className={`btn ${lightMode ? '' : ' night'}`}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Contact;
