import React from 'react';
import { injectIntl } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenu.css';
import cx from 'classnames';

// Component 
import Link from '../../Link';
import history from '../../../core/history';
import { getSideMenu } from '../../../helpers/getSideMenu';

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  handleClick() {
    history.push('/become-a-owner/car');
  }

  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  render() {
    const { showSideMenu } = this.props;
    const { formatMessage } = this.props.intl;
    const { location } = this.state;
    let sideMenuData = getSideMenu(showSideMenu, formatMessage);

    return (
      <>
        <ul className={cx('sideMenuBorder', 'listLayoutArbic')}>

          {
            sideMenuData.map((item, index) => {
              return (
                <>
                  <li className={cx('sideMenuBorderPadding', ((item.activeLocation.includes(location)) ? 'menuActive' : "menuNotActive"))}>
                    <Link to={item.menuLocation} className={cx('sideNavitem', 'sideNav')}>
                      <span className={cx('spaceLeft18')}>{item.menuName}</span>
                    </Link>
                  </li>
                </>
              )
            })
          }
        </ul>
      </>
    );
  }
}

export default injectIntl(withStyles(s)(SideMenu));