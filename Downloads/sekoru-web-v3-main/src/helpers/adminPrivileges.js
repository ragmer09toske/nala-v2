export function validatePrivilege(requestId, permittedPrevileges) {
    return permittedPrevileges && permittedPrevileges.length > 0 && permittedPrevileges.indexOf(requestId) >= 0;
}

export function restrictUrls(requestURL, permittedPrevileges, privileges) {
    let findRequestedUrlId = privileges.find((o) => o && o.permittedUrls
        && o.permittedUrls.length > 0 && o.permittedUrls.indexOf(requestURL) >= 0);

    if (findRequestedUrlId) {
        let checkAccess = permittedPrevileges && permittedPrevileges.length > 0
            && permittedPrevileges.indexOf(findRequestedUrlId.id) >= 0;
        if (checkAccess) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
