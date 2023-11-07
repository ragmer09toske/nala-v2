import { toastr } from "react-redux-toastr";

export default function dropzoneError(file, getSiteSettingsLogo) {
    let errorToastr;

    let fileFormates = [
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
        'text/calendar'
    ];

    if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
        errorToastr = toastr.error('Error!', 'You are trying to upload invalid image file. Please upload PNG, JPG & JPEG format image file.');
    }
    return errorToastr;
}