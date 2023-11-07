import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { change } from 'redux-form';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { startEmailLogoUploaderLoader, doUploadEmailLogo, doRemoveHomeLogo, stopEmailLogoUploaderLoader } from '../../../../actions/siteadmin/manageLogo';
// Translation
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class Dropzone extends Component {

    static propTypes = {
        doUploadEmailLogo: PropTypes.any.isRequired,
        doRemoveHomeLogo: PropTypes.any.isRequired,
        startEmailLogoUploaderLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.error = this.error.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadEmailLogo, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data.value : null;
        let filePath = fromServer.file.path;
        doUploadEmailLogo(fileName, filePath, oldPicture);
        await change('SiteSettingsForm', 'emailLogo', fileName);
    }

    async error(file) {
        const { stopEmailLogoUploaderLoader } = this.props;
        let fileFormates = [
            'image/svg+xml',
            'application/sql',
            'application/pdf',
            'application/vnd.oasis.opendocument.presentation',
            'text/csv',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/epub+zip',
            'application/zip',
            'text/plain',
            'application/rtf',
            'application/vnd.oasis.opendocument.text',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.spreadsheet',
            'text/tab-separated-values',
            'text/calendar',
            'application/json'
        ];

        if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
            toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
            stopEmailLogoUploaderLoader();
            return;
        }
    };

    addedfile(file, fromServer) {
        const { startEmailLogoUploaderLoader, stopEmailLogoUploaderLoader, maxUploadSize } = this.props;
        if (file.size > (1024 * 1024 * parseInt(maxUploadSize))) {
            toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
            this.dropzone.removeFile(file);
            stopEmailLogoUploaderLoader();
            return;
        }
        startEmailLogoUploaderLoader();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: "",
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadEmailLogo'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile,
            error: this.error
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                >
                    {formatMessage(messages.clickHeretoUploadLogo)}
                </DropzoneComponent>
            </div>
        );
    }
}

const mapState = (state) => ({
    maxUploadSize: state.siteSettings.data.maxUploadSize
});

const mapDispatch = {
    doUploadEmailLogo,
    doRemoveHomeLogo,
    startEmailLogoUploaderLoader,
    change,
    stopEmailLogoUploaderLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
