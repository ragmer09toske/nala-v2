import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = async () => {
    try {
      const response = await axios.post(
        'https://api.sendinblue.com/v3/smtp/email',
        {
          to: [{ email: recipientEmail }],
          templateId: 2, // Replace with your template ID
          htmlContent: "<p><p/>",
          params: {FIRSTNAME:"Retsepile"}, // Customize with template variables if needed
          from: { email: 'nucleusdevs@gmail.com' }, // Replace with your sender email
        },
        {
          headers: {
            'api-key': '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', // Replace with your SendinBlue API key
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      {emailSent && <p>Email sent successfully!</p>}
    </div>
  );
};

export default SendEmail;
