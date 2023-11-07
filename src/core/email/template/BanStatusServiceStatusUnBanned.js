import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';
import { COMMON_TEXT_COLOR } from '../../../constants/index';

class BanStatusServiceStatusUnBanned extends React.Component {

	static propTypes = {
		content: PropTypes.shape({
			userMail: PropTypes.string.isRequired,
		}).isRequired
	};

	render() {

		const textStyle = {
			color: COMMON_TEXT_COLOR,
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px'
		};
		const { content: { userName, userMail, adminMail, logo } } = this.props;
		let mailTo = 'mailto:' + adminMail;

		return (
			<Layout>
				<Header 
					color="rgb(255, 90, 95)" 
					backgroundColor="#F7F7F7" 
					logo={logo}
				/>
				<Body textStyle={textStyle}>
					<div>
						Dear {userName},
                    </div>
					<EmptySpace height={20} />
					<div>
						You are not banned now you can login.
                                 	</div>
					<EmptySpace height={20} />
					<div>
						Please get in touch with <a href={mailTo}>{adminMail}</a> if you have any questions.
					        		</div>
					<EmptySpace height={40} />
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

export default BanStatusServiceStatusUnBanned;