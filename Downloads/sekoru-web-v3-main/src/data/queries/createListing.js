// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import CreateListingType from '../types/CreateListingType';

// Sequelize models
import { Listing, UserListingSteps, UserListingData, BedTypes, ListSettings } from '../../data/models';

import fetch from '../../core/fetch';

const createListing = {

  type: CreateListingType,

  args: {
    carType: { type: StringType },
    model: { type: StringType },
    transmission: { type: StringType },
    bedrooms: { type: StringType },
    year: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    bedTypes: { type: StringType },
    make: { type: StringType },
    odometer: { type: StringType },
  },

  async resolve({ request, response }, {
    carType,
    model,
    transmission,
    bedrooms,
    year,
    bedType,
    beds,
    personCapacity,
    bathrooms,
    bathroomType,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    bedTypes,
    make,
    odometer,
  }) {

    if (request.user && request.user.admin != true) {


      const removeListSettings = await ListSettings.count({
        where: {
          id: {
            $in: [carType, model, year, make, odometer]
          }
        }
      })
      if (removeListSettings < 5) {
        return {
          status: "unSuccess"
        }
      }

      const address = street + ", " + city + ", " + state + ", " + country + ", " + zipcode;

      const query = `
        query ($address: String) {
          locationItem(address: $address) {
            street
            city
            state
            country
            zipcode
            lat
            lng
          }
        }
      `;

      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: { address: address }
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();

      let latValue = lat;
      let lngValue = lng;

      if (data.locationItem != null) {
        latValue = data.locationItem.lat;
        lngValue = data.locationItem.lng;
      }

      const doCreateListing = await Listing.create({
        userId: request.user.id,
        transmission: transmission,
        bedrooms: bedrooms,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: latValue,
        lng: lngValue,
        lastUpdatedAt: new Date()
      });



      if (doCreateListing) {

        // Recently added list id
        const id = doCreateListing.dataValues.id;

        let bedTypeData;
        if (bedTypes && bedTypes.length > 0) {

          bedTypeData = JSON.parse(bedTypes);

          // items included
          if (bedTypeData != null && bedTypeData != undefined) {

            const removeBedTypes = await BedTypes.destroy({
              where: {
                listId: id
              }
            });

            await Promise.all(bedTypeData.map(async (item, key) => {
              let updateBedTypes = await BedTypes.create({
                listId: id,
                bedCount: item.bedCount,
                bedType: item.bedType
              })
            })
            );
          }
        }

        // Assign other settings values in here
        let otherListSettings = [
          { settingsId: carType, listId: id },
          { settingsId: model, listId: id },
          { settingsId: year, listId: id },
          // { settingsId: bedType, listId: id },
          // { settingsId: bathroomType, listId: id },
          { settingsId: make, listId: id },
          { settingsId: odometer, listId: id },
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        return {
          status: "success",
          id: id
        };
      } else {
        return {
          status: "failed",
        };
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default createListing;
