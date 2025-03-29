import '../App.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
interface ContactProps {
	setContact: () => void;
	lightMode: boolean;
}

function Contact({ setContact, lightMode }: ContactProps) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmitWebForm = () => {
		// add name, email subject, and form or message conditional after building form. should then lead to a thank you page
		fetch('https://hook.us2.make.com/slsb9izje85iletx3lrkdb88iydmrybm', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name,
				email,
				subject,
				message,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log('Success:', data);
				setName('');
				setEmail('');
				setSubject('');
				setMessage('');
			})
			.catch((error) => {
				console.error('Error submitting form:', error);
			});
		setContact();
	};

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
						<div>Tell me everything you can about your dream website.</div>
						<div>Include budget, scope of the project, and functionality.</div>
						<div>
							I'd love to build you a scalable modular site, maintain a reliable CRM system,
							<div>help drive business to your it with SEO,</div>
							<div>and/or build a more efficient workflow for you.</div>
						</div>
						<div>I will reply within a day.</div>
					</div>
					<div></div>
					<form
						className='folio-form'
						onSubmit={handleSubmitWebForm}>
						<input
							className='form-ctrl'
							name='name'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder='Name'
						/>
						<input
							className='form-ctrl'
							name='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder='Email'
						/>
						<input
							className='form-ctrl'
							name='subject'
							type='text'
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							placeholder='Subject'
						/>
						<textarea
							className='form-ctrl'
							name='message'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							cols={30}
							rows={3}
							placeholder='Write your message...'></textarea>
						<input
							type='submit'
							value='Request a Quote'
							className={`btn ${lightMode ? '' : ' night'}`}
						/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Contact;
