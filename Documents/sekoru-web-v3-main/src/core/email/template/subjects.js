export function getSubject(type) {
	let subject, previewText;

	if(type === 'welcomeEmail' || type === 'confirmEmail' ) {
		subject = 'Please confirm your e-mail address';
		previewText = 'Action Required! Confirm your email';
	}
	if(type === 'bookingRequest') {
		subject = 'You have a new trip';
		previewText = 'Great News! You have a new trip';
	}
	if(type === 'bookingRequestGuest') {
		subject = 'Your trip request sent to your owner';
		previewText = 'Great News! Your trip is shared with owner';
	}
	if(type === 'bookingConfirmedToHost') {
		subject = 'You have confirmed a trip';
		previewText = 'Confirmed Reservation Details';
	}
	if(type === 'bookingConfirmedToGuest') {
		subject = 'Your trip is confirmed by your owner';
		previewText = 'Pack your bag, you are ready for your trip!';
	}
	if(type === 'bookingDeclinedToGuest') {
		subject = 'Your trip request is declined by your owner';
		previewText = 'We are sorry, your request is declined';
	}
	if(type === 'bookingExpiredGuest') {
		subject = 'Your trip request is expired';
		previewText = 'We are sorry, your request is expired';
	}
	if(type === 'bookingExpiredHost') {
		subject = 'Your trip is expired';
		previewText = 'Your trip is expired';
	}
	if(type === 'cancelledByHost') {
		subject = 'Your trip is cancelled by owner';
		previewText = 'Your trip is cancelled';
	}
	if(type === 'cancelledByGuest') {
		subject = 'Your trip is cancelled by renter';
		previewText = 'Your trip is cancelled';
	}
	if(type === 'completedGuest') {
		subject = 'Please write a review for your owner';
		previewText = 'Action Required! Write a Review';
	}
	if(type === 'completedHost' ) {
		subject = 'Please write a review for your renter';
		previewText = 'Action Required! Write a Review';
	}
	if(type === 'forgotPasswordLink' ) {
		subject = 'Reset your Password';
		previewText = 'Action Required! Reset your Password';
	}

	if(type === 'message') {
		subject = 'You have got a new message';
		previewText = 'Someone sent you a new message!';
	}

	if (type === 'inquiry') {
		subject = 'You have got a new inquiry';
		previewText = 'Someone sent you an inquiry from contact form!';
	}

	if (type === 'documentVerification') {
		subject = 'Documents verification status';
		previewText = 'Documents verification status';
	}
	if (type === 'contact') {
		subject = 'Contact Form';
		previewText = 'Contact Form';
	}
	if (type === 'reportUser') {
		subject = 'Reporting the User';
		previewText = 'Report User Form';
	}
	if (type === 'bookingPreApproval') {
		subject = 'Owner pre-approved your request';
		previewText = 'Booking pre-approved';
	}

	if (type === 'banStatusServiceStatusBanned') {
		subject = 'Status Banned';
		previewText = 'Status Banned';
	}
	if (type === 'banStatusServiceStatusUnBanned') {
		subject = 'Status Unbanned';
		previewText = 'Status Unbanned';
	}
	if (type === 'contactSupport') {
		subject = 'Customer Support';
		previewText = 'Customer Support';
	}
	if (type === 'userFeedback') {
		subject = 'Customer Feedback';
		previewText = 'Customer Feedback';
	}

	return {
		subject,
		previewText
	};
}