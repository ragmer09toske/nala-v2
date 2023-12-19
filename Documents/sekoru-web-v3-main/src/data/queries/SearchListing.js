import searchListingType from '../types/searchListingType';
import {
  Listing
} from '../../data/models';
import sequelize from '../sequelize';
import moment from 'moment';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BoolType
} from 'graphql';

const SearchListing = {

  type: searchListingType,

  args: {
    personCapacity: { type: IntType },
    dates: { type: StringType },
    currentPage: { type: IntType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    roomType: { type: new List(IntType) },
    bedrooms: { type: IntType },
    bathrooms: { type: IntType },
    beds: { type: IntType },
    amenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    houseRules: { type: new List(IntType) },
    priceRange: { type: new List(FloatType) },
    geography: { type: StringType },
    bookingType: { type: StringType },
    geoType: { type: StringType },
    searchByMap: { type: BoolType },
    sw_lat: { type: FloatType },
    sw_lng: { type: FloatType },
    ne_lat: { type: FloatType },
    ne_lng: { type: FloatType },
    make: { type: StringType },
    transmission: { type: StringType }
  },

  async resolve({ request }, {
    personCapacity,
    dates,
    currentPage,
    lat,
    lng,
    roomType,
    bedrooms,
    bathrooms,
    beds,
    amenities,
    spaces,
    houseRules,
    priceRange,
    geography,
    bookingType,
    geoType,
    searchByMap,
    sw_lat,
    sw_lng,
    ne_lat,
    ne_lng,
    make,
    transmission
  }) {

    let limit = 12;
    let offset = 0, distance = 300;
    let attributesParam = ['id', 'title', 'personCapacity', 'lat', 'lng', 'beds', 'coverPhoto', 'bookingType', 'userId', 'reviewsCount', 'transmission'];
    let publishedStatus = {}, personCapacityFilter = {}, datesFilter = {}, countryFilter = {};
    let roomTypeFilter = {}, bedroomsFilter = {}, bathroomsFilter = {}, bedsFilter = {};
    let amenitiesFilter = {}, spacesFilter = {}, houseRulesFilter = {}, priceRangeFilter = {}, geographyFilter, mapBoundsFilter;
    let bookingTypeFilter = {}, unAvailableFilter = {}, makeFilter = {}, transmissionFilter = {};
    let maximumNoticeFilter = {}, minDaysFilter = {}, maxDaysFilter = {};

    if (bookingType && bookingType === 'instant') {
      bookingTypeFilter = {
        bookingType
      }
    }

    if (transmission && transmission == 'Automatic') {
      transmissionFilter = {
        transmission: 1
      }
    }

    if (sw_lat && ne_lat && sw_lng && ne_lng) { // Maps NorthWest & SouthEast view ports
      mapBoundsFilter = {
        id: {
          $in: [
            sequelize.literal(`
                SELECT
                    id
                FROM
                    Listing
                WHERE
                    ( lat BETWEEN ${sw_lat} AND ${ne_lat} ) 
                AND 
                    ( lng BETWEEN ${sw_lng} AND ${ne_lng} )`
            )
          ]
        }
      };
    }

    // Geography Type Filter
    if (geoType && !searchByMap) {
      let geographyConverted = await JSON.parse(geography);
      if (geoType === 'street') {
        geographyFilter = {
          $or: [
            {
              street: {
                $like: '%' + geographyConverted.route + '%'
              },
              state: geographyConverted.administrative_area_level_1_short,
              country: geographyConverted.country
            },
            {
              street: {
                $like: '%' + geographyConverted.route + '%'
              },
              state: {
                $like: geographyConverted.administrative_area_level_1_long + '%'
              },
              country: geographyConverted.country
            }
          ]
        };
        countryFilter = { country: geographyConverted.country };
      } else if (geoType === 'state') {
        geographyFilter = {
          $or: [
            {
              state: geographyConverted.administrative_area_level_1_short,
              country: geographyConverted.country
            },
            {
              state: {
                $like: geographyConverted.administrative_area_level_1_long + '%',
              },
              country: geographyConverted.country
            }
          ]
        };
        countryFilter = { country: geographyConverted.country };
      } else if (geoType === 'country') {
        countryFilter = { country: geographyConverted.country };
      }
    } else if (lat && lng && !searchByMap) {
      geographyFilter = {
        id: {
          $in: [
            sequelize.literal(`
                SELECT
                    id
                FROM
                    Listing
                WHERE
                    (
                        6371 *
                        acos(
                            cos( radians( ${lat} ) ) *
                            cos( radians( lat ) ) *
                            cos(
                                radians( lng ) - radians( ${lng} )
                            ) +
                            sin(radians( ${lat} )) *
                            sin(radians( lat ))
                        )
                    ) < ${distance}
              `)
          ]
        }
      };
    }


    if (priceRange != undefined && priceRange.length > 0) {

      priceRangeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListingData WHERE (basePrice / (SELECT rate FROM CurrencyRates WHERE currencyCode=currency limit 1)) BETWEEN ${priceRange[0]} AND ${priceRange[1]}`)
          ]
        }
      };
    }

    unAvailableFilter = {
      id: {
        $notIn: [
          sequelize.literal(`SELECT listId FROM ListingData WHERE maxDaysNotice='unavailable'`)
        ]
      }
    };

    // Offset from Current Page
    if (currentPage) {
      offset = (currentPage - 1) * limit;
    }

    // Published Status
    publishedStatus = {
      isPublished: true,
    };

    // Bedrooms Filter
    if (bedrooms) {
      bedroomsFilter = {
        bedrooms: {
          $gte: bedrooms
        }
      };
    }

    // Bathrooms Filter
    if (bathrooms) {
      bathroomsFilter = {
        bathrooms: {
          $gte: bathrooms
        }
      };
    }

    // Beds Filter
    if (beds) {
      bedsFilter = {
        beds: {
          $gte: beds
        }
      };
    }


    // Person Capacity Filter
    if (personCapacity) {
      personCapacityFilter = {
        personCapacity: {
          $gte: personCapacity
        }
      };
    }

    if (dates && dates.toString().trim() !== '') {
      let noticeFilter = [], spiltDate = dates.split("AND"), checkIn, checkOut, startDay, endDay, currentDay;

      currentDay = moment().format('YYYY-MM-DD')

      if (spiltDate) {
        checkIn = moment(spiltDate[0].replace(/[']/g, '').trim(' '));
        checkOut = moment(spiltDate[1].replace(/[']/g, '').trim(' '));
        startDay = moment(spiltDate[0]).format('YYYY-MM-DD')
        endDay = moment(spiltDate[1]).format('YYYY-MM-DD')
      }

      if (currentDay > startDay || currentDay > endDay) {
        return {
          count: 0,
          results: []
        }
      }

      await [3, 6, 9, 12].map((value) => {
        let date = moment().add(value, 'months').format('YYYY-MM-DD');
        if (checkOut.isBetween(checkIn, date)) noticeFilter.push(`'${value}months'`);
      });

      let maxDaysNoticeFilter = noticeFilter.length > 0 ? `'available',${noticeFilter.toString()}` : `'available'`;
      //Maximum Notice Filter
      maximumNoticeFilter = {
        id: {
          $in: [
            sequelize.literal("SELECT listId FROM ListingData WHERE maxDaysNotice in (" + maxDaysNoticeFilter + ")")
          ]
        }
      };

      // Min Night Filter
      minDaysFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListingData WHERE minDay = 0 OR minDay <= ${checkOut.diff(checkIn, 'days') + 1}`)
          ]
        }
      };

      //Max Night Filter
      maxDaysFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM ListingData WHERE maxDay = 0 OR maxDay >= ${checkOut.diff(checkIn, 'days') + 1}`)
          ]
        }
      };

      // Date Range Filter
      datesFilter = {
        $or: [
          {
            id: {
              $notIn: [
                sequelize.literal("SELECT listId FROM ListBlockedDates Where calendarStatus!='available'")
              ]
            }
          },
          {
            id: {
              $notIn: [
                sequelize.literal("SELECT listId FROM ListBlockedDates WHERE blockedDates BETWEEN" + dates + "and calendarStatus!='available'")
              ]
            }
          }
        ]
      }
    }


    // Room type Filter
    if (roomType != undefined && roomType.length > 0) {
      roomTypeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${roomType.toString()})`)
          ]
        }
      };
    }

    if (make) {
      makeFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in(${make})`)
          ]
        }
      };
    }

    // Amenities Filter
    if (amenities != undefined && amenities.length > 0) {
      amenitiesFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserAmenities WHERE amenitiesId in(${amenities.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${amenities.length}`)
          ]
        }
      };
    }


    // Spaces Filter
    if (spaces != undefined && spaces.length > 0) {
      spacesFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserSpaces WHERE spacesId in(${spaces.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${spaces.length}`)
          ]
        }
      };
    }

    // House Rules Filter
    if (houseRules != undefined && houseRules.length > 0) {
      houseRulesFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT listId FROM UserHouseRules WHERE houseRulesId in(${houseRules.toString()}) GROUP BY listId HAVING COUNT(listId) >= ${houseRules.length}`)
          ]
        }
      };
    }

    let where, filters = [
      bookingTypeFilter,
      publishedStatus,
      personCapacityFilter,
      datesFilter,
      roomTypeFilter,
      bedroomsFilter,
      bathroomsFilter,
      bedsFilter,
      amenitiesFilter,
      spacesFilter,
      houseRulesFilter,
      priceRangeFilter,
      unAvailableFilter,
      makeFilter,
      transmissionFilter,
      maxDaysFilter,
      minDaysFilter,
      maximumNoticeFilter,
      countryFilter //To prevent france country's Listing in the result, while searching for United Kingdom country
    ];

    if (mapBoundsFilter || geographyFilter) {
      where = {
        $or: [
          mapBoundsFilter || {},
          geographyFilter || {}
        ],
        $and: filters
      };
    } else {
      where = { $and: filters }
    }

    // SQL query for count
    const count = await Listing.count({ where });

    // SQL query for results
    const results = await Listing.findAll({
      attributes: attributesParam,
      where,
      limit: limit,
      offset: offset,
      order: [['reviewsCount', 'DESC'], ['createdAt', 'DESC']],
    });

    return {
      count,
      results
    }

  },
};

export default SearchListing;