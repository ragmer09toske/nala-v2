import React, { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import { toastr } from 'react-redux-toastr';
import dropzoneError from '../../../helpers/dropzoneError';


export class ImageUploadComponent extends Component {

	constructor(props) {
		super(props);
		this.dropzone = null;
	}

	componentDidUpdate() {
		const isBrowser = typeof window !== 'undefined';
		const isDocument = typeof document !== undefined;
		if (isBrowser && isDocument) {
			document.querySelector(".dz-hidden-input").style.visibility = 'visible';
			document.querySelector(".dz-hidden-input").style.opacity = '0';
			document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
		}
	}

	error = (file) => {
		const { setLoaderComplete, loaderName, maxUploadSize, getSiteSettingsLogo } = this.props;
		
		dropzoneError(file)

		if (loaderName) setLoaderComplete(loaderName);

		if (file && file.size > (1024 * 1024 * parseInt(maxUploadSize))) {
			toastr.error('Maximum upload size Exceeded! ', 'Try with smallest size image');
			if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
				toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
				return;
			}
		}

		if(getSiteSettingsLogo && (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0))){
			toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG format image file.');
			return;
		}
	};

	complete = (file) => {
		const { setLoaderComplete, loaderName } = this.props;
		this.dropzone.files = [];
		if (loaderName) setLoaderComplete(loaderName);
	}


	addedfile = (file) => {
		const { setLoaderStart, loaderName } = this.props;
		if (loaderName) setLoaderStart(loaderName);
	}

	render() {
		const { defaultMessage, className, subTextClass, subText, componentConfig, success, maxUploadSize, getSiteSettingsLogo } = this.props;
		let pngFormat = getSiteSettingsLogo?.name === "faviconLogo" ? 'image/png' :'image/jpeg, image/png, image/jpg';
		const eventHandlers = {
			init: dz => this.dropzone = dz,
			success,
			error: this.error,
			complete: this.complete,
			addedfile: this.addedfile
		};

		const djsConfig = {
			dictDefaultMessage: '',
			addRemoveLinks: false,
			uploadMultiple: false,
			maxFilesize: parseInt(maxUploadSize),
			acceptedFiles: pngFormat,
			dictMaxFilesExceeded: 'Remove the existing image and try upload again',
			previewsContainer: false,
			hiddenInputContainer: '.dzInputContainerLogo',
			timeout: 300000,
			maxFiles: 1
		};

		return (
			<div className={cx('listPhotoContainer')}>
				<div className={cx('dzInputContainerLogo', 'dzInputContainerLogoOpacity')}>
					<div className={className}>
						<DropzoneComponent
							config={componentConfig}
							eventHandlers={eventHandlers}
							djsConfig={{
								...djsConfig,
								// dictDefaultMessage: defaultMessage
							}}

						>
							{defaultMessage}
						</DropzoneComponent>
					</div>
				</div>
				{subText && <p className={cx(subTextClass, 'droupText')}><span>{subText}:</span> <span>{maxUploadSize}MB</span></p>}
			</div>
		)
	}
}

const mapState = state => ({
	maxUploadSize: state.siteSettings.data.maxUploadSize
});

const mapDispatch = {
	setLoaderStart,
	setLoaderComplete
};

export default (connect(mapState, mapDispatch)(ImageUploadComponent));

