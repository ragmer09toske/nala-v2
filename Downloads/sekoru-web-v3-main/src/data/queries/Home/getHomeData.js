import { Banner } from '../../models';
import HomeCommonType from '../../types/Home/HomeCommonType';

const getHomeData = {

  type: HomeCommonType,
  
 async resolve({}) {
    try {
      let result = await Banner.findOne();
      return {
        result
      };
    } catch (error) {}
  }
};

export default getHomeData;

