import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { change } from 'redux-form';

import { connect } from 'react-redux';
import { getImageLoader } from '../../../../../actions/siteadmin/ImageLoader/imageLoader'
import { IMAGE_LOADER1_START, IMAGE_LOADER1_SUCCESS} from '../../../../../constants/index'
import { injectIntl } from 'react-intl';
 import messages from '../../../../../locale/messages';

class Dropzone extends Component {

    static propTypes = {
        getImageLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        image: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { change, getImageLoader } = this.props;
        let fileName = fromServer.file.filename;

        await change('WhyHostForm', 'hostBannerImage1', fileName);
        await getImageLoader(IMAGE_LOADER1_SUCCESS, false)
    }

    addedfile(file, fromServer) {
        const { getImageLoader } = this.props;
        getImageLoader(IMAGE_LOADER1_START, true);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadImage),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadHomeBanner'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    getImageLoader,
    change    
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
