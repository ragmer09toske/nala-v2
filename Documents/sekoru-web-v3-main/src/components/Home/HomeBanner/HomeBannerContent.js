import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl } from 'react-intl';
import s from './HomeBanner.css';
import cx from 'classnames';
//Components
import BannerCaption from '../BannerCaption';
import SearchForm from '../SearchForm';
import BookYourCarSkeleton from '../../Skeleton/BookYourCarSkeleton';
import BookYourCar from '../BookYourCar/BookYourCar';

class HomeBannerContent extends React.Component {

    static propTypes = {
        getImageBannerData: PropTypes.shape({
            loading: PropTypes.bool,
            getImageBanner: PropTypes.object
        }),
    };

    static defaultProps = {
        getImageBannerData: {
            loading: true
        },
    }

    render() {
        const { layoutType, wholeData, infoCollection, getBannerData } = this.props;
        return (
            <div className={s.container}>
                <div className={s.sectionWidth}>
                    {
                        layoutType && layoutType == 2 && <div className={s.pageContainer}>
                            <SearchForm />
                        </div>
                    }
                    {
                        layoutType && layoutType == 2 && <div className={cx(s.pageContainer, s.pageContainerMb)}>
                            <BannerCaption data={getBannerData} />
                        </div>
                    }
                </div>
                {!wholeData.getFindYouCar ? <BookYourCarSkeleton /> :
                    <BookYourCar infoCollection={infoCollection} />}
            </div>
        )
    }
}

export default injectIntl(withStyles(s)(HomeBannerContent));
