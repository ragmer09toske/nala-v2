import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import cs from '../../../components/commonStyle.css';
import {
  Collapse,
  Button
} from 'react-bootstrap';
import cx from 'classnames';

// Translation
import { injectIntl } from 'react-intl';
import * as FontAwesome from 'react-icons/lib/fa';

//Images
import arrowIcon from '/public/SiteIcons/listArrowLeft.svg';

class ListItem extends React.Component {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string,
        settingsType: PropTypes.shape({
          typeName: PropTypes.string
        }),
      }),
      spacesId: PropTypes.string,
    })).isRequired,
    label: PropTypes.string.isRequired,
  };

  static defaultProps = {
    itemList: [],
    showLabel: 'Show More',
    hideLabel: 'Close all'
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { itemList, label, showLabel, hideLabel, className } = this.props;
    const { open } = this.state;

    let count = 4, firstArray, restArray, dotString = false;

    let itemListData = itemList && itemList.length > 0 ? itemList.filter(o => o?.listsettings?.isEnable == "1") : [];


    if (itemListData) {
      firstArray = itemListData.slice(0, count);
      restArray = itemListData.slice(count, itemListData.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }

    return (
      <>
        <h6 className={cx(cs.commonSubTitleText, cs.fontWeightBold)}>{label}</h6>
        {
          firstArray.map((item, key) => {
            if (item?.listsettings?.isEnable === "1") {
              return (
                <div className={className}>
                  <p
                    key={key}
                    className={cx(cs.commonContentText, s.displayFlex, cs.paddingTop3)}
                  >
                    <img src={arrowIcon} className={cx(s.streeingImage, 'commonIconSpace')} />
                    <span>
                      {item && item?.listsettings && item?.listsettings?.itemName}
                    </span>
                  </p>
                </div>
              )
            }
          })
        }
        <Collapse in={open}>
          <div>
            {
              restArray && restArray.length > 0 && restArray.map((item, key) => {
                if (item?.listsettings?.isEnable === "1") {
                  return (
                    <div className={className}>
                      <p
                        key={key}
                        className={cx(cs.commonContentText, s.displayFlex, cs.paddingTop3)}
                      >
                        <img src={arrowIcon} className={cx(s.streeingImage, 'commonIconSpace')} />
                        <span>
                          {item && item.listsettings && item?.listsettings?.itemName}
                        </span>
                      </p>
                    </div>
                  )
                }
              })
            }
          </div>
        </Collapse>
        {
          dotString && <div className={cs.paddingTop2}>
            <Button
              bsStyle="link"
              type="button"
              className={s.showHideBtn}
              onClick={() => this.handleClick()}
            >
              {this.state.open ? hideLabel : showLabel}
              {
                this.state.open && <FontAwesome.FaAngleUp className={s.toggleIcon} />
              }
              {
                !this.state.open && <FontAwesome.FaAngleDown className={s.toggleIcon} />
              }
            </Button>
          </div>
        }
        <hr className={cs.listingHorizoltalLine} />
      </>
    );
  }

}

export default injectIntl(withStyles(s, cs)(ListItem));