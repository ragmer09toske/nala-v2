import messages from '../locale/messages';
import siteSettingsIcon from '/public/AdminIcons/siteSettingIcon.svg'
import manageUserIcon from '/public/AdminIcons/manageUser.svg'
import manageCarsIcon from '/public/AdminIcons/manageCars.svg'
import manageReservationIcon from '/public/AdminIcons/manageReservation.svg'
import manageSecurityIcon from '/public/AdminIcons/securityDeposit.svg'
import reviewsManagementIcon from '/public/AdminIcons/reviewsManagement.svg'
import servicesFeeIcon from '/public/AdminIcons/manageReviewFees.svg'
import documentVerificationIcon from '/public/AdminIcons/documentVerification.svg'
import messageIcon from '/public/AdminIcons/messageicon.svg'
import reportManagementIcon from '/public/AdminIcons/reportIcon.svg'
import paymentGateIcon from '/public/AdminIcons/paymentGateway.svg'
import manageCurrencyIcon from '/public/AdminIcons/manageCurrency.svg'
import settingsIcon from '/public/AdminIcons/searchSettings.svg'
import passwordIcon from '/public/AdminIcons/changePassword.svg'
import ownerPageIcon from '/public/AdminIcons/ownerPage.svg'
import siteConfigureIcon from '/public/AdminIcons/siteConfigureIcon.svg'
import payOutManagementIcon from '/public/AdminIcons/payoutIcon.svg'
import contentIcon from '/public/AdminIcons/contentManagementIcon.svg'
import staticContentIcon from '/public/AdminIcons/staticContentIcon.svg'
import arrowIcon from '/public/AdminIcons/subArrowIcon.svg'

export function getAdminSideMenu(formatMessage, location) {
    let sideMenuData1 = [
        {
            menuLocation: "/siteadmin/settings/site",
            menuName: formatMessage(messages.siteSettings),
            activeLocation: (location === "/siteadmin/settings/site"),
            icon: siteSettingsIcon,
            iconAltText: 'siteSettingsIcon',
            isValidatePrivilege: true,
            privilegeId: 1
        },
        {
            menuLocation: "/siteadmin/settings/config",
            menuName: formatMessage(messages.manageSiteConfig),
            activeLocation: (location === "/siteadmin/settings/config"),
            icon: siteConfigureIcon,
            iconAltText: 'siteConfigureIcon',
            isValidatePrivilege: false,
            isSuperAdmin: true
        },
    ];

    let sideMenuData3 = [
        {
            menuLocation: "/siteadmin/users",
            menuName: formatMessage(messages.manageUser),
            activeLocation: (location === "/siteadmin/users" || location.startsWith('/siteadmin/profileView')),
            icon: manageUserIcon + '?' + Math.random(),
            iconAltText: 'manageUserIcon',
            isValidatePrivilege: true,
            privilegeId: 2
        },
        {
            menuLocation: "/siteadmin/listings",
            menuName: formatMessage(messages.manageListing),
            activeLocation: (location === "/siteadmin/listings"),
            icon: manageCarsIcon + '?' + Math.random(),
            iconAltText: 'manageCarsIcon',
            isValidatePrivilege: true,
            privilegeId: 3
        },
        {
            menuLocation: "/siteadmin/reservations",
            menuName: formatMessage(messages.manageReservations),
            activeLocation: (location === "/siteadmin/reservations" || location.startsWith('/siteadmin/viewreservation/')),
            icon: manageReservationIcon,
            iconAltText: 'manageReservationIcon',
            isValidatePrivilege: true,
            privilegeId: 4
        },
        {
            menuLocation: "/siteadmin/manage-security-deposit",
            menuName: formatMessage(messages.manageSecurityDeposit),
            activeLocation: (location === "/siteadmin/manage-security-deposit"),
            icon: manageSecurityIcon,
            iconAltText: 'manageSecurityIcon',
            isValidatePrivilege: true,
            privilegeId: 20
        },
        {
            menuLocation: "/siteadmin/user-reviews",
            menuName: formatMessage(messages.reviewManagement),
            activeLocation: (location === "/siteadmin/user-reviews" || location.startsWith('/siteadmin/management-reviews/')),
            icon: reviewsManagementIcon,
            iconAltText: 'reviewsManagementIcon',
            isValidatePrivilege: true,
            privilegeId: 5
        },
        {
            menuLocation: "/siteadmin/settings/servicefees",
            menuName: formatMessage(messages.manageServiceFee),
            activeLocation: (location === "/siteadmin/settings/servicefees"),
            icon: servicesFeeIcon,
            iconAltText: 'servicesFeeIcon',
            isValidatePrivilege: true,
            privilegeId: 7
        },
        {
            menuLocation: "/siteadmin/document",
            menuName: formatMessage(messages.documentverificaiton),
            activeLocation: (location === "/siteadmin/document"),
            icon: documentVerificationIcon,
            iconAltText: 'documentVerificationIcon',
            isValidatePrivilege: true,
            privilegeId: 8
        },
        {
            menuLocation: "/siteadmin/messages",
            menuName: formatMessage(messages.messages),
            activeLocation: (location === "/siteadmin/messages"),
            icon: messageIcon,
            iconAltText: 'messageIcon',
            isValidatePrivilege: true,
            privilegeId: 9
        },
        {
            menuLocation: "/siteadmin/reportUser",
            menuName: formatMessage(messages.reportManagement),
            activeLocation: (location === "/siteadmin/reportUser"),
            icon: reportManagementIcon,
            iconAltText: 'reportManagementIcon',
            isValidatePrivilege: true,
            privilegeId: 10
        },
        {
            menuLocation: "/siteadmin/payout",
            menuName: formatMessage(messages.payOutManagement),
            activeLocation: (location === "/siteadmin/payout" || location.startsWith('/siteadmin/viewpayout/')),
            icon: payOutManagementIcon,
            iconAltText: 'payOutManagementIcon',
            isValidatePrivilege: true,
            privilegeId: 11
        },
        {
            menuLocation: "/siteadmin/payment-gateway-section",
            menuName: formatMessage(messages.managePaymentGateWay),
            activeLocation: (location === "/siteadmin/payment-gateway-section"),
            icon: paymentGateIcon,
            iconAltText: 'paymentGateIcon',
            isValidatePrivilege: true,
            privilegeId: 12
        },
        {
            menuLocation: "/siteadmin/settings/search",
            menuName: formatMessage(messages.searchSettings),
            activeLocation: (location === "/siteadmin/settings/search"),
            icon: settingsIcon,
            iconAltText: 'settingsIcon',
            isValidatePrivilege: true,
            privilegeId: 14
        },
        {
            menuLocation: "/siteadmin/currency",
            menuName: formatMessage(messages.manageCurrency),
            activeLocation: (location === "/siteadmin/currency"),
            icon: manageCurrencyIcon,
            iconAltText: 'manageCurrencyIcon',
            isValidatePrivilege: false,
            isSuperAdmin: true
        },
        {
            menuLocation: "/siteadmin/change/admin",
            menuName: formatMessage(messages.changePasswordLabel),
            activeLocation: (location === "/siteadmin/change/admin"),
            icon: passwordIcon,
            iconAltText: 'passwordIcon',
            isValidatePrivilege: false,
            isSuperAdmin: true
        },
        {
            menuLocation: "/siteadmin/why-host",
            menuName: formatMessage(messages.whyHostPage),
            activeLocation: (location === "/siteadmin/why-host"),
            icon: ownerPageIcon,
            iconAltText: 'ownerPageIcon',
            isValidatePrivilege: true,
            privilegeId: 16
        },
        {
            menuLocation: "/siteadmin/content-management",
            menuName: formatMessage(messages.contentManagementLabel),
            activeLocation: (location === "/siteadmin/content-management" || location.startsWith('/siteadmin/edit/page/') || location.startsWith('/siteadmin/page/add')),
            icon: contentIcon,
            iconAltText: 'contentIcon',
            isValidatePrivilege: true,
            privilegeId: 18
        },
        {
            menuLocation: "/siteadmin/staticpage/management",
            menuName: formatMessage(messages.staticContentManagement),
            activeLocation: (location === "/siteadmin/staticpage/management" || location.startsWith('/siteadmin/edit/staticpage/')),
            icon: staticContentIcon,
            iconAltText: 'staticContentIcon',
            isValidatePrivilege: true,
            privilegeId: 19
        }
    ];

    let sideMenuData2 = [
        {
            menuLocation: "/siteadmin/admin-users",
            menuName: formatMessage(messages.manageAdminUsers),
            activeLocation: (location === "/siteadmin/admin-users"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/admin-roles",
            menuName: formatMessage(messages.manageAdminRoles),
            activeLocation: (location === "/siteadmin/admin-roles"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
    ];

    let sideMenuData4 = [
        {
            menuLocation: "/siteadmin/reviews",
            menuName: formatMessage(messages.manageReviwes),
            activeLocation: (location === "/siteadmin/reviews" || location.startsWith('/siteadmin/edit-review/')),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/write-reviews",
            menuName: formatMessage(messages.writeReviwes),
            activeLocation: (location === "/siteadmin/write-reviews"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
    ];

    let sideMenuData5 = [
        {
            menuLocation: "/siteadmin/home/caption",
            menuName: formatMessage(messages.bannerCaptionLabel),
            activeLocation: (location === "/siteadmin/home/caption"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/home/find-your-car",
            menuName: formatMessage(messages.findYourCar),
            activeLocation: (location === "/siteadmin/home/find-your-car"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/popularlocation",
            menuName: formatMessage(messages.managePopularLocations),
            activeLocation: (location === "/siteadmin/popularlocation" || location.startsWith('/siteadmin/edit/popularlocation/') || location.startsWith('/siteadmin/popularlocation/add')),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/home/banner",
            menuName: formatMessage(messages.imageBannerLabel),
            activeLocation: (location === "/siteadmin/home/banner"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/home/static-info-block",
            menuName: formatMessage(messages.staticInfoBlock),
            activeLocation: (location === "/siteadmin/home/static-info-block"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/home/footer-block",
            menuName: formatMessage(messages.footerBlockLabel),
            activeLocation: (location === "/siteadmin/home/footer-block"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
    ];

    let sideMenuData6 = [
        {
            menuLocation: "/siteadmin/whyHost/Block1",
            menuName: formatMessage(messages.blockLabel) + ' 1',
            activeLocation: (location === "/siteadmin/whyHost/Block1"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/Block2",
            menuName: formatMessage(messages.blockLabel) + ' 2',
            activeLocation: (location === "/siteadmin/whyHost/Block2"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/Block3",
            menuName: formatMessage(messages.blockLabel) + ' 3',
            activeLocation: (location === "/siteadmin/whyHost/Block3"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/Block4",
            menuName: formatMessage(messages.blockLabel) + ' 4',
            activeLocation: (location === "/siteadmin/whyHost/Block4"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/Block5",
            menuName: formatMessage(messages.blockLabel) + ' 5',
            activeLocation: (location === "/siteadmin/whyHost/Block5"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/review",
            menuName: formatMessage(messages.blockLabel) + ' 6',
            activeLocation: (location === "/siteadmin/whyHost/review" || location === "/siteadmin/whyHost/review/add" || location.startsWith("/siteadmin/whyHost/review/edit/")),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/whyHost/Block7",
            menuName: formatMessage(messages.blockLabel) + ' 7',
            activeLocation: (location === "/siteadmin/whyHost/Block"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
    ];

    let sideMenuData7 = [
        {
            menuLocation: "/siteadmin/listsettings/1",
            menuName: formatMessage(messages.carType),
            activeLocation: (location === "/siteadmin/listsettings/1"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/20",
            menuName: formatMessage(messages.makeLabel),
            activeLocation: (location === "/siteadmin/listsettings/20"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/3",
            menuName: formatMessage(messages.modelLabel),
            activeLocation: (location === "/siteadmin/listsettings/3"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/4",
            menuName: formatMessage(messages.year),
            activeLocation: (location === "/siteadmin/listsettings/4"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/10",
            menuName: formatMessage(messages.carFeatures),
            activeLocation: (location === "/siteadmin/listsettings/10"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/21",
            menuName: formatMessage(messages.odometer),
            activeLocation: (location === "/siteadmin/listsettings/21"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        }];

    let sideMenuData8 = [
        {
            menuLocation: "/siteadmin/listsettings/13",
            menuName: formatMessage(messages.guestRequirements),
            activeLocation: (location === "/siteadmin/listsettings/13"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/14",
            menuName: formatMessage(messages.carRules),
            activeLocation: (location === "/siteadmin/listsettings/14"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/15",
            menuName: formatMessage(messages.reviewHowRentersBook),
            activeLocation: (location === "/siteadmin/listsettings/15"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/18",
            menuName: formatMessage(messages.minimumDays),
            activeLocation: (location === "/siteadmin/listsettings/18"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        },
        {
            menuLocation: "/siteadmin/listsettings/19",
            menuName: formatMessage(messages.maximumDays),
            activeLocation: (location === "/siteadmin/listsettings/19"),
            icon: arrowIcon,
            iconAltText: 'arrowIcon',
            isValidatePrivilege: false,
        }];

    return {
        sideMenuData1,
        sideMenuData2,
        sideMenuData3,
        sideMenuData4,
        sideMenuData5,
        sideMenuData6,
        sideMenuData7,
        sideMenuData8,
    };
}
