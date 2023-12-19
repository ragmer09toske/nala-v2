import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoDataView.css';
import cs from '../../components/commonStyle.css'
class NoDataView extends Component {

    render() {

        const { title, siteTitle, content1, content2, noDataIconSec, noDataIcon, noDataImgSize } = this.props

        return (
            <div className={cs.textAlignCenter}>
                <div className={cx(noDataIconSec, s.imageCenter, cs.spaceBottom5)}>
                    <img src={noDataIcon} alt='' className={cx(noDataImgSize)} />
                </div>
                <div className={cx(cs.marginInlineAuto, cs.spaceBottom5, s.commonWidth)}>
                    <p className={cx(cs.commonTotalText, cs.spaceBottom2, cs.fontWeightBold)}>{title}</p>
                    <p className={cx(cs.commonMediumText, cs.fontWeightNormal)}><span>{siteTitle}{' '}</span>{content1} {content2}</p>
                </div>
            </div>
        );
    }
}

export default (withStyles(s, cs)((NoDataView)));