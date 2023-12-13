import {
    GraphQLString as StringType
} from 'graphql';
import { WhyHostInfoBlock } from '../../models';
import WhyHostBlockType from '../../types/WhyHostBlockType';

const updateWhyHostPage = {

    type: WhyHostBlockType,

    args: {
        hostBannerTitle1: { type: StringType },
        hostBannerContent1: { type: StringType },
        hostBannerImage1: { type: StringType },
        earnBlockTitle1: { type: StringType },
        earnBlockContent1: { type: StringType },
        earnBlockContent2: { type: StringType },
        whyBlockTitle1: { type: StringType },
        whyBlockContent1: { type: StringType },
        whyBlockTitle2: { type: StringType },
        whyBlockContent2: { type: StringType },
        easyHostTitle1: { type: StringType },
        easyHostContent1: { type: StringType },
        easyHostContent2: { type: StringType },
        workTitleHeading: { type: StringType },
        workTitle1: { type: StringType },
        workTitle2: { type: StringType },
        workContent1: { type: StringType },
        workContent2: { type: StringType },
        workImage1: { type: StringType },
        peaceTitleHeading: { type: StringType },
        peaceTitle1: { type: StringType },
        peaceTitle2: { type: StringType },
        peaceTitle3: { type: StringType },
        peaceContent1: { type: StringType },
        peaceContent2: { type: StringType },
        peaceContent3: { type: StringType },
        hostBannerContent2: { type: StringType },
        hostBannerImage2: { type: StringType },
        whyBlockImage1: { type: StringType },
        whyBlockImage2: { type: StringType },
        workImage1: { type: StringType },
        workImage2: { type: StringType },
        workImage3: { type: StringType },
        workImage4: { type: StringType },
    },

    async resolve({ request }, {
        hostBannerTitle1,
        hostBannerContent1,
        hostBannerImage1,
        earnBlockTitle1,
        earnBlockContent1,
        earnBlockContent2,
        whyBlockTitle1,
        whyBlockContent1,
        whyBlockTitle2,
        whyBlockContent2,
        easyHostTitle1,
        easyHostContent1,
        easyHostContent2,
        workTitleHeading,
        workTitle1,
        workTitle2,
        workContent1,
        workContent2,
        peaceTitleHeading,
        peaceTitle1,
        peaceTitle2,
        peaceTitle3,
        peaceContent1,
        peaceContent2,
        peaceContent3,
        hostBannerContent2,
        hostBannerImage2,
        whyBlockImage1,
        whyBlockImage2,
        workImage1,
        workImage2,
        workImage3,
        workImage4
    }) {

        if (request.user && request.user.admin == true) {
            let siteSettingsFields = {
                hostBannerTitle1,
                hostBannerContent1,
                hostBannerImage1,
                earnBlockTitle1,
                earnBlockContent1,
                earnBlockContent2,
                whyBlockTitle1,
                whyBlockContent1,
                whyBlockTitle2,
                whyBlockContent2,
                easyHostTitle1,
                easyHostContent1,
                easyHostContent2,
                workTitleHeading,
                workTitle1,
                workTitle2,
                workContent1,
                workContent2,
                workImage1,
                peaceTitleHeading,
                peaceTitle1,
                peaceTitle2,
                peaceTitle3,
                peaceContent1,
                peaceContent2,
                peaceContent3,
                hostBannerContent2,
                hostBannerImage2,
                whyBlockImage1,
                whyBlockImage2,
                workImage1,
                workImage2,
                workImage3,
                workImage4
            };

            await Promise.all(
                Object.keys(siteSettingsFields).map(async (item) => {
                    await WhyHostInfoBlock.update({ value: siteSettingsFields[item] }, { where: { name: item } })
                })
            );

            return {
                status: 'success'
            }

        } else {
            return {
                status: 'failed'
            }
        }
    },
};

export default updateWhyHostPage;

// mutation (
//     $hostBannerTitle1: String,
//     $hostBannerContent1: String,
//     $hostBannerImage1: String,
//     $earnBlockTitle1: String,
//     $earnBlockContent1: String,
//     $earnBlockContent2: String,
//     $whyBlockTitle1: String,
//     $whyBlockContent1: String,
//     $whyBlockTitle2: String,
//     $whyBlockContent2: String,
//     $easyHostTitle1: String,
//     $easyHostContent1: String,
//     $easyHostContent2: String,
//     $workTitleHeading: String,
//     $workTitle1: String,
//     $workTitle2: String,
//     $workContent1: String,
//     $workContent2: String,
//     $workImage1: String,
//     $peaceTitleHeading: String,
//     $peaceTitle1: String,
//     $peaceTitle2: String,
//     $peaceTitle3: String,
//     $peaceContent1: String,
//     $peaceContent2: String,
//     $peaceContent3: String
// ) {
//   updateWhyHostPage (
//     hostBannerTitle1: $hostBannerTitle1,
//     hostBannerContent1: $hostBannerContent1,
//     hostBannerImage1: $hostBannerImage1,
//     earnBlockTitle1: $earnBlockTitle1,
//     earnBlockContent1: $earnBlockContent1,
//     earnBlockContent2: $earnBlockContent2,
//     whyBlockTitle1: $whyBlockTitle1,
//     whyBlockContent1: $whyBlockContent1,
//     whyBlockTitle2: $whyBlockTitle2,
//     whyBlockContent2: $whyBlockContent2,
//     easyHostTitle1: $easyHostTitle1,
//     easyHostContent1: $easyHostContent1,
//     easyHostContent2: $easyHostContent2,
//     workTitleHeading: $workTitleHeading,
//     workTitle1: $workTitle1,
//     workTitle2: $workTitle2,
//     workContent1: $workContent1,
//     workContent2: $workContent2,
//     workImage1: $workImage1,
//     peaceTitleHeading: $peaceTitleHeading,
//     peaceTitle1: $peaceTitle1,
//     peaceTitle2: $peaceTitle2,
//     peaceTitle3: $peaceTitle3,
//     peaceContent1: $peaceContent1,
//     peaceContent2: $peaceContent2,
//     peaceContent3: $peaceContent3
//   ) {
//       status
//   }
// }
