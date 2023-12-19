import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import { ListSettings as ListSettingsModel } from '../../../data/models';

const ListSettings = new ObjectType({
  name: 'getAdminlistSettings',
  description: "Represents listing field values",
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    makeType: { type: StringType },
    modelType: { type: StringType },
    makeTypeLabel: {
      type: StringType,
      async resolve(listSettings) {
        if (listSettings && listSettings.makeType) {
          let foundSetting = await ListSettingsModel.findOne({
            where: {
              id: listSettings.makeType
            }
          })
          return foundSetting.itemName;
        }

      }
    }
  }
});

const ListSettingsType = new ObjectType({
  name: 'getAdminlistSettingsType',
  description: "Represents listing field types",
  fields: {
    id: { type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isEnable: { type: StringType },
    status: { type: StringType },
    errorMessage: { type: StringType },
    listSettings: {
      type: new List(ListSettings),
      resolve(listSettingsType) {
        return listSettingsType.getListSettings();
      }
    },
  },
});

export default ListSettingsType;
