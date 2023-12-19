import PaymentMethodsType from '../../types/PaymentMethodsType';
import {PaymentMethods, Payout } from '../../models';

import {
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const updatePaymentGatewayStatus = {
    type: PaymentMethodsType,
    args: {
        id: {type: new NonNull(IntType)},
        isEnable: {type: new NonNull(BooleanType)}
    },

    async resolve({request}, {id, isEnable}) {
        if(request.user && request.user.admin) {
            let isAllow = 0;
            let getStatus = await PaymentMethods.findAll({
                where: {
                    isEnable: 1
                },
                raw: true
            });
            
            if(getStatus && getStatus.length == 1 && isEnable == false) {
                isAllow = 1;
            }
            if(isAllow === 0 ){
                let updateStatus = await PaymentMethods.update({
                    isEnable
                }, {
                    where: {
                        id
                    }
                });
                if(!isEnable){
                    let updatePayouts = await Payout.update({
                        default: false
                    },{
                        where: {
                            methodId: id
                        }
                    });
                }
                if(updateStatus) {
                    return{
                        status: '200'
                    }
                } else {
                    return {
                        status: '400'
                    }
                }
            } else {
                return {
                    status: 'Atleast one option must be active'
                }
            }
            
        }
    }
}

export default updatePaymentGatewayStatus;