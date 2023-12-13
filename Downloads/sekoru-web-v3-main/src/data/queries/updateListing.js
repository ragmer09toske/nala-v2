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
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingSteps,
  UserListingData,
  BedTypes,
  ListSettings
} from '../../data/models';

const updateListing = {

  type: EditListingType,

  args: {
    id: { type: IntType },
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
    isMapTouched: { type: BooleanType },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    carFeatures: { type: new List(IntType) },
    bedTypes: { type: StringType },
    make: { type: StringType },
    odometer: { type: StringType },
  },

  async resolve({ request, response }, {
    id,
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
    isMapTouched,
    amenities,
    safetyAmenities,
    carFeatures,
    bedTypes,
    make,
    odometer,
  }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

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

      const doUpdateListing = await Listing.update({
        transmission: transmission,
        bedrooms: bedrooms,
        bedType: bedType,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: lat,
        lng: lng,
        isMapTouched: isMapTouched,
        lastUpdatedAt: new Date()
      },
        {
          where
        })
        .spread(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });

      // User Settings Data
      if (isListUpdated) {
        const removeUserSettingsData = await UserListingData.destroy({
          where: {
            listId: id
          }
        });

        let otherListSettings = [
          { settingsId: carType, listId: id },
          { settingsId: model, listId: id },
          { settingsId: year, listId: id },
          { settingsId: make, listId: id },
          { settingsId: odometer, listId: id },
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        // Amenities
        // if (amenities != null && amenities != undefined) {
        //   const removeAmenities = await UserAmenities.destroy({
        //     where: {
        //       listId: id
        //     }
        //   });
        //   amenities.map(async (item, key) => {
        //     let updateAmenities = await UserAmenities.create({
        //       listId: id,
        //       amenitiesId: item
        //     })
        //   });
        // }

        // Safety Amenities
        if (safetyAmenities != null && safetyAmenities != undefined) {
          const removeSafetyAmenities = await UserSafetyAmenities.destroy({
            where: {
              listId: id
            }
          });
          safetyAmenities.map(async (item, key) => {
            let updateSafetyAmenities = await UserSafetyAmenities.create({
              listId: id,
              safetyAmenitiesId: item
            })
          });
        }

        // carFeatures
        if (carFeatures != null && carFeatures != undefined) {
          const removeSpaces = await UserAmenities.destroy({
            where: {
              listId: id
            }
          });
          await UserAmenities.bulkCreate(carFeatures.map((item) => { return { listId: id, amenitiesId: item } }));
        }

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

      }




      if (isListUpdated) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListing;
