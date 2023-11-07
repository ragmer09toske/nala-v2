import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookYourCar.css';
import cs from '../../commonStyle.css'
import cx from 'classnames';

//Image
import icon from '/public/SiteIcons/streeingWheel.svg';

class BookYourCar extends React.Component {

    render() {
        const { infoCollection } = this.props;

        return (
            <div className={s.bookGrid}>
                {infoCollection && <><img src={`/images/home/${infoCollection.image}`} className={cs.fullWidth} />
                    <div className={cx(s.paddingLeft, 'paddingLeftBookRTL')}>
                        <h2 className={cx(cs.commonTitleText, cs.fontWeightBold)}>{infoCollection.heading}</h2>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content1}</span>
                        </div>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content2}</span>
                        </div>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content3}</span>
                        </div>
                        {infoCollection.content4 && <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content4}</span>
                        </div>}
                        {infoCollection.content5 && <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content5}</span>
                        </div>}
                        <a href={infoCollection.buttonLink} target="_blank" className={cx(cs.btnPrimary, cs.spaceTop4, cs.displayinlineBlock)}>
                            {infoCollection.buttonLabel}
                        </a>
                    </div> </>}
            </div>
        );
    }

}

export default withStyles(s, cs)(BookYourCar);