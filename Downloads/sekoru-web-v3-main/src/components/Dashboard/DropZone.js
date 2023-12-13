import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import editIcon from '/public/SiteIcons/editingWishIcon.svg';
import cs from '../../components/commonStyle.css';
import profileEditIcon from '/public/SiteIcons/editProfileIcon.svg'

import {
    doUploadProfilePicture,
    doRemoveProfilePicture,
    startProfilePhotoLoader,
    stopProfilePhotoLoader
} from '../../actions/manageUserProfilePicture';
import { toastr } from 'react-redux-toastr';

class Dropzone extends Component {

    static propTypes = {
        doUploadProfilePicture: PropTypes.any.isRequired,
        doRemoveProfilePicture: PropTypes.any.isRequired,
        startProfilePhotoLoader: PropTypes.any.isRequired,
        guestPicture: PropTypes.string,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.removeExistingFile = this.removeExistingFile.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    componentDidMount() {
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
            document.querySelector(".dz-hidden-input").style.visibility = 'visible';
            document.querySelector(".dz-hidden-input").style.opacity = '0';
            document.querySelector(".dz-hidden-input").style.height = '100%';
            document.querySelector(".dz-hidden-input").style.width = '100%';
            document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
    }

    componentDidUpdate() {
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
            document.querySelector(".dz-hidden-input").style.visibility = 'visible';
            document.querySelector(".dz-hidden-input").style.opacity = '0';
            document.querySelector(".dz-hidden-input").style.height = '100%';
            document.querySelector(".dz-hidden-input").style.width = '100%';
            document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
    }

    success(file, fromServer) {
        const { doUploadProfilePicture, guestPicture, stopProfilePhotoLoader, startProfilePhotoLoader } = this.props;
        let fileName = fromServer.file.filename;
        startProfilePhotoLoader();
        doUploadProfilePicture(fileName, guestPicture);
    }

    addedfile(file, fromServer) {
        const { stopProfilePhotoLoader, maxUploadSize, startProfilePhotoLoader } = this.props;
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
            'text/tab-separated-values'
        ];
        startProfilePhotoLoader();
        if (file && file.size > (1024 * 1024 * parseInt(maxUploadSize))) {
            toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
            this.dropzone.removeFile(file);
            stopProfilePhotoLoader();
            return;
        } else if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
            this.dropzone.removeFile(file);
            toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
            stopProfilePhotoLoader();
            return;
        }
    }

    removeExistingFile(fileName) {
        const { doRemoveProfilePicture } = this.props;
        this.dropzone.removeAllFiles();
        doRemoveProfilePicture(fileName);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { defaultMessage, maxUploadSize, className, iconPosition, isEditIcon } = this.props;
        const djsConfig = {
            dictDefaultMessage: '',
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: maxUploadSize,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            hiddenInputContainer: '.dzInputContainer'
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadProfilePhoto'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <div className={className}>
                    <div className={cx('dzInputContainer', 'dashboardDropzoneBox', 'dashboardDropzone', 'dashboardFile')}>
                        <DropzoneComponent
                            config={componentConfig}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}
                        >
                            {
                                isEditIcon &&
                                <img src={profileEditIcon} />
                            }
                            {!isEditIcon && <img src={editIcon} className={cx(cs.dropzoneImgSpace, iconPosition, 'dropzoneImgSpaceRTL')} />}
                            {defaultMessage && defaultMessage}

                        </DropzoneComponent>
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({
    maxUploadSize: state.siteSettings.data.maxUploadSize
});

const mapDispatch = {
    doUploadProfilePicture,
    doRemoveProfilePicture,
    startProfilePhotoLoader,
    stopProfilePhotoLoader
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
