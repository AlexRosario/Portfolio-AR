import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ServicePrices {
	[key: string]: number;
}
interface ServicesProps {
	lightMode: boolean;
	setServices: () => void;
}
interface FormData {
	name: string;
	email: string;
	phone: string;
	services: { [key: string]: boolean };
	projectDescription: string;
	targetAudience: string;
	desiredLaunchDate: string;
	existingWebsite: string;
	budget: string;
	additionalComments: string;
	consentToContact: boolean;
}

const ServiceInquiryForm: React.FC<ServicesProps> = ({ lightMode, setServices }) => {
	const servicePrices: ServicePrices = {
		websiteDevelopment: 3000,
		websiteRedesign: 2000,
		ecommerceSolutions: 5000,
		crmSetup: 1000,
		crmCustomization: 2000,
		dataMigration: 1000,
		seoSem: 1500,
		contentMarketing: 1500,
		emailMarketing: 800,
		websiteAnalytics: 800,
		crmAnalytics: 800,
	};

	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		services: {},
		projectDescription: '',
		targetAudience: '',
		desiredLaunchDate: '',
		existingWebsite: '',
		budget: '',
		additionalComments: '',
		consentToContact: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		if (type === 'checkbox') {
			setFormData((prevState) => ({
				...prevState,
				services: { ...prevState.services, [name]: checked },
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const calculateTotalPrice = (): number => {
		return Object.keys(formData.services).reduce((total, service) => {
			if (formData.services[service]) {
				return total + servicePrices[service];
			}
			return total;
		}, 0);
	};

	return (
		<form
			id='service-inquiry-form'
			className={`${lightMode ? '' : ' night'}`}>
			<div className='service-exit'>
				<FontAwesomeIcon
					icon={faTimes}
					className='exit-btn'
					onClick={() => setServices()}
				/>
			</div>
			<div className='service-container'>
				<div className='form-services'>
					<h2 className={`page-header${lightMode ? '' : ' night'}`}>Service Inquiry Form</h2>
					{Object.keys(servicePrices).map((service) => (
						<label key={service}>
							<input
								className='checkbox'
								type='checkbox'
								name={service}
								checked={formData.services[service] || false}
								onChange={handleChange}
							/>
							{service.replace(/([A-Z])/g, ' $1').trim()}
						</label>
					))}
				</div>
				<div>Total Price: ${calculateTotalPrice()}</div>
			</div>
		</form>
	);
};

export default ServiceInquiryForm;
