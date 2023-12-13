import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

class FeedbackMail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            message: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
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

        const textBold = {
            fontWeight: 'bold'
        };

        const { content: { message, type, name, logo } } = this.props;
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
                        {name} has sent you a {type} that {message}.
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

export default FeedbackMail;