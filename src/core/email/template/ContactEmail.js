import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

class ContactEmail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            ContactMessage: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            phoneNumber: PropTypes.any.isRequired,
        })
    };

    render() {
        const textStyle = {
            color: COMMON_TEXT_COLOR,
            backgroundColor: '#F7F7F7',
            fontFamily: 'Arial',
            fontSize: '16px',
            padding: '35px'
        };
        const { content: { ContactMessage, email, name, phoneNumber, logo } } = this.props;

        return (
            <Layout>
                <Header 
                    color="rgb(255, 90, 95)" 
                    backgroundColor="#F7F7F7" 
                    logo={logo}
                />
                <Body textStyle={textStyle}>
                    <div>
                        Hi Admin,
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        A visitor/user wants to contact. Below are their contact information,
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        Name: {name}<br /><br />
                        Email: {email}<br /><br />
                        Contact Number: {phoneNumber}<br /><br />
                        Message: {ContactMessage}<br />
                    </div>
                    <EmptySpace height={30} />
                    <div>
                        Thanks, <br />
                        The {sitename} Team
                    </div>
                </Body>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default ContactEmail;