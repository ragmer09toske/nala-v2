import messages from '../locale/messages';

export function getSideMenu(showSideMenu, formatMessage) {
    let sideMenuData = [];
    if (showSideMenu == 'listContainer') {
        sideMenuData = [
            {
                menuLocation: "/cars",
                menuName: formatMessage(messages.yourListings),
                activeLocation: ["/cars"]
            },
            {
                menuLocation: "/reservation/current",
                menuName: formatMessage(messages.upcomingReservations),
                activeLocation: ["/reservation/current"]
            },
            {
                menuLocation: "/reservation/previous",
                menuName: formatMessage(messages.previousReservations),
                activeLocation: ["/reservation/previous"]
            }
        ]
    } else if (showSideMenu == 'tripsContainer') {
        sideMenuData = [
            {
                menuLocation: "/trips/current",
                menuName: formatMessage(messages.upcomingTrips),
                activeLocation: ["/trips/current"]
            },
            {
                menuLocation: "/trips/previous",
                menuName: formatMessage(messages.previousTrips),
                activeLocation: ["/trips/previous"]
            }
        ]
    } else if (showSideMenu == 'editProfileContainer') {
        sideMenuData = [
            {
                menuLocation: "/user/edit",
                menuName: formatMessage(messages.editProfile),
                activeLocation: ["/user/edit"]
            },
            {
                menuLocation: "/user/verification",
                menuName: formatMessage(messages.trustAndVerification),
                activeLocation: ["/user/verification", "/document-verification"]
            },
            {
                menuLocation: "/user/reviews/about-you",
                menuName: formatMessage(messages.reviews),
                activeLocation: ["/user/reviews/about-you"]
            }
        ]
    } else if (showSideMenu == 'accountMenu') {
        sideMenuData = [
            {
                menuLocation: "/user/payout",
                menuName: formatMessage(messages.paymentPayouts),
                activeLocation: ["/user/payout", "/user/addpayout"]
            },
            {
                menuLocation: "/user/transaction/completed",
                menuName: formatMessage(messages.transactionHistory),
                activeLocation: ["/user/transaction/completed", "/user/transaction/future", "/user/transaction/grossEarnings"]
            },
            {
                menuLocation: "/users/security",
                menuName: formatMessage(messages.security),
                activeLocation: ["/users/security"]
            }
        ]
    } else if (showSideMenu == 'showReviewContainer') {
        sideMenuData = [
            {
                menuLocation: "/user/reviews/about-you",
                menuName: formatMessage(messages.reviewsAboutYou),
                activeLocation: ["/user/reviews/about-you"]
            },
            {
                menuLocation: "/user/reviews/you",
                menuName: formatMessage(messages.reviewsByYou),
                activeLocation: ["/user/reviews/you"]
            },
            {
                menuLocation: "/user/edit",
                menuName: formatMessage(messages.editProfile),
                activeLocation: ["/user/edit"]
            }
        ]
    }

    return sideMenuData;
}