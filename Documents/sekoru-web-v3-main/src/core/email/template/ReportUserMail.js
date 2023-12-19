import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

class ReportUserMail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            userName: PropTypes.string.isRequired,
            reporterName: PropTypes.string.isRequired,
            reportType: PropTypes.string.isRequired
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
        const { content: { userName, reporterName, reportType, logo, defaultContent } } = this.props;

        return (
            <Layout>
                <Header
                    color="rgb(255, 90, 95)"
                    backgroundColor="#F7F7F7"
                    logo={logo}
                />
                <Body textStyle={textStyle}>
                    <div>
                        Hi admin,
                    </div>
                    <EmptySpace height={20} />
                    {defaultContent ?
                        <div>
                            This is to inform you that the {userName} has violated the terms and condition of the platform. Please do the necessary action for this report.
                            Reported by {reporterName}.
                        </div> :
                        <div>
                            Here, You receive an email to report the user {userName} by the report type {reportType} by {reporterName}.
                        </div>}
                    <EmptySpace height={20} />
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

export default ReportUserMail;