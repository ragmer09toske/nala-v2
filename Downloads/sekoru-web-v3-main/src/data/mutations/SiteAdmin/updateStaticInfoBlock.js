import StaticBlockType from '../../types/StaticBlockType';
import { StaticInfoBlock } from '../../../data/models'

import {
    GraphQLString as StringType
} from 'graphql';

const updateStaticInfoBlock = {

    type: StaticBlockType,

    args: {
        carCounterTitle1: { type: StringType },
        carCounterContent1: { type: StringType },
        carCounterTitle2: { type: StringType },
        carCounterContent2: { type: StringType },
        carCounterTitle3: { type: StringType },
        carBlockTitle1: { type: StringType },
        carBlockContent1: { type: StringType },
        carBlockTitle2: { type: StringType },
        carTripTitle1: { type: StringType },
        carTripContent1: { type: StringType },
        carTripTitle2: { type: StringType },
        carTripContent2: { type: StringType },
        carTripTitle3: { type: StringType },
        carTripContent3: { type: StringType }
    },

    async resolve({ request }, {
        carCounterTitle1,
        carCounterContent1,
        carCounterTitle2,
        carCounterContent2,
        carCounterTitle3,
        carBlockTitle1,
        carBlockContent1,
        carBlockTitle2,
        carTripTitle1,
        carTripContent1,
        carTripTitle2,
        carTripContent2,
        carTripTitle3,
        carTripContent3
    }) {

        if (request.user && request.user.admin == true) {
            let isStaticBlockSettingsUpdated = false;

            const updateCarCounterTitle1 = await StaticInfoBlock.update({ value: carCounterTitle1 }, { where: { name: 'carCounterTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updateCarCounterContent1 = await StaticInfoBlock.update({ value: carCounterContent1 }, { where: { name: 'carCounterContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updateCarCounterTitle2 = await StaticInfoBlock.update({ value: carCounterTitle2 }, { where: { name: 'carCounterTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarCounterContent2 = await StaticInfoBlock.update({ value: carCounterContent2 }, { where: { name: 'carCounterContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarCounterTitle3 = await StaticInfoBlock.update({ value: carCounterTitle3 }, { where: { name: 'carCounterTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarBlockTitle1 = await StaticInfoBlock.update({ value: carBlockTitle1 }, { where: { name: 'carBlockTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarBlockContent1 = await StaticInfoBlock.update({ value: carBlockContent1 }, { where: { name: 'carBlockContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarBlockTitle2 = await StaticInfoBlock.update({ value: carBlockTitle2 }, { where: { name: 'carBlockTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripTitle1 = await StaticInfoBlock.update({ value: carTripTitle1 }, { where: { name: 'carTripTitle1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripContent1 = await StaticInfoBlock.update({ value: carTripContent1 }, { where: { name: 'carTripContent1' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripTitle2 = await StaticInfoBlock.update({ value: carTripTitle2 }, { where: { name: 'carTripTitle2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripContent2 = await StaticInfoBlock.update({ value: carTripContent2 }, { where: { name: 'carTripContent2' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripTitle3 = await StaticInfoBlock.update({ value: carTripTitle3 }, { where: { name: 'carTripTitle3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });

            const updatecarTripContent3 = await StaticInfoBlock.update({ value: carTripContent3 }, { where: { name: 'carTripContent3' } })
                .then(function (instance) {
                    if (instance > 0) {
                        isStaticBlockSettingsUpdated = true;
                    } else {
                        isStaticBlockSettingsUpdated = false;
                    }
                });


            

            if (isStaticBlockSettingsUpdated) {
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
                status: 'failed'
            }
        }

    },
};

export default updateStaticInfoBlock;
