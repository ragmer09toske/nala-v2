import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';

const ListSettings = new ObjectType({
  name: 'AdminListSettings',
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

export default ListSettings;
