import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';

import {connect} from 'react-redux';
import {startLogoUploaderLoader, doUploadLogo, doRemoveLogo, stopLogoUploaderLoader} from '../../../../actions/siteadmin/manageLogo';
//Message
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
import { toastr } from 'react-redux-toastr';

class Dropzone extends Component {

    static propTypes = {
        doUploadLogo: PropTypes.any.isRequired,
        doRemoveLogo: PropTypes.any.isRequired,
        startLogoUploaderLoader: PropTypes.any.isRequired,
        stopLogoUploaderLoader: PropTypes.any.isRequired,
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
        const {doUploadLogo, data, startLogoUploaderLoader, stopLogoUploaderLoader} = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data.value : null;
        let filePath = fromServer.file.path;
       await startLogoUploaderLoader();
       await doUploadLogo(fileName, filePath, oldPicture);
       await stopLogoUploaderLoader();
    }

    async error(file, message) {
        const { stopLogoUploaderLoader } = this.props;
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
        this.dropzone.removeFile(file);
        if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
        toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
        await stopLogoUploaderLoader();
    }
}
    
   async addedfile(file, fromServer) {
        const { stopLogoUploaderLoader, maxUploadSize } = this.props;
        if (file.size > (1024 * 1024 * parseInt(maxUploadSize))) {
            this.dropzone.removeFile(file);
            toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
           await stopLogoUploaderLoader();
        } 
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadLogo),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadLogo'
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
                /> 
            </div>
        );
    }
}

const mapState = (state) => ({
    maxUploadSize: state.siteSettings.data.maxUploadSize
});

const mapDispatch = {
    doUploadLogo,
    doRemoveLogo,
    startLogoUploaderLoader,
    stopLogoUploaderLoader
   
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
