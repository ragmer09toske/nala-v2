import React from 'react';
import PropTypes from 'prop-types';

// Assets
import mediumNoImage from './medium_no_image.png';
import largeNoImage from './large_no_image.jpeg';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListGridCoverPhoto.css'
import cx from 'classnames';
import { openImageLightBox } from '../../actions/ImageLightBox';
// Redux
import { connect } from 'react-redux';

class ListGridCoverPhoto extends React.Component {
    static propTypes = {
        coverPhoto: PropTypes.number,
        listPhotos: PropTypes.array,
        className: PropTypes.string,
        bgImage: PropTypes.bool
    };

    static defaultProps = {
        bgImage: false
    }

    constructor(props) {
        super(props);
        this.state = {
            photo: null
        };
    }

    UNSAFE_componentWillMount() {
        const { coverPhoto, listPhotos } = this.props;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { coverPhoto, listPhotos } = nextProps;
        let activePhoto;
        if (listPhotos != undefined && listPhotos.length > 0) {
            activePhoto = listPhotos[0].name;
            if (coverPhoto != undefined && coverPhoto != null) {
                listPhotos.map((item) => {
                    if (item.id === coverPhoto) {
                        activePhoto = item.name;
                    }
                })
            }
            this.setState({ photo: activePhoto });
        }
    }
  
    openSliderClick = (index) => {
        const { openImageLightBox } = this.props;
        let root = document.getElementsByTagName('html')[0];
        root.classList.add('scrollHidden');
        openImageLightBox(index);
    }
    
    render() {

        const { className, photoType, bgImage, listPhotos, openImageLightBox } = this.props;
        const { photo } = this.state;


        let img0, img1, img2, img4;
        if (listPhotos != undefined && listPhotos.length > 0) {
            img0 = listPhotos[0].src;
            img1 = listPhotos[1].src;
            img2 = listPhotos[2].src;
            img4 = listPhotos[3].src;
        }

        let path = '', source;
        if (photo != null) {
            source = photo;
            if (photoType != undefined) {
                path = '/images/upload/' + photoType + '_';
            }
        } else {
            if (photoType != undefined) {
                if (photoType === "xx_large") {
                    source = largeNoImage;
                } else if (photoType === "x_medium") {
                    source = mediumNoImage;
                }
            } else {
                source = mediumNoImage
            }
        }

        if (bgImage) {

            return (
                <div className={s.displayGrid}>
                    <div className={cx(className, s.bgbanner, s.firstImage, 'listGridPhotoFirstImageRTL')} style={{ backgroundImage: `url(${img0})` }} onClick={() => this.openSliderClick(0)}>
                        {this.props.children}
                    </div>
                    <div>
                        <div className={cx(className, s.bgbanner, s.secondImage, 'listGridPhotoSecondImageRTL')} style={{ backgroundImage: `url(${img1})` }} onClick={() => this.openSliderClick(1)} />
                        <div className={s.displayGrid}>
                            <div className={cx(className, s.bgbanner, s.thiredImage, 'listGridPhotoThridImageRTL')} style={{ backgroundImage: `url(${img4})` }} onClick={() => this.openSliderClick(3)} />
                            <div className={cx(className, s.bgbanner, s.fouthImage, 'listGridPhotoForthImageRTL')} style={{ backgroundImage: `url(${img2})` }} onClick={() => this.openSliderClick(2)} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <img src={path + source} className={className} />
            );
        }


    }
}
const mapState = (state) => ({

});

const mapDispatch = {
    openImageLightBox
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListGridCoverPhoto));