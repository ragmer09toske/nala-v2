import DateAvailabilityType from '../types/DateAvailabilityType';
import { ListBlockedDates } from '../../data/models';
import moment from 'moment';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const DateAvailability = {

  type: DateAvailabilityType,

  args: {
    listId: { type: new NonNull(IntType) },
    startDate: { type: new NonNull(StringType) },
    endDate: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, { listId, startDate, endDate }) {

    const checkAvailableDates = await ListBlockedDates.findAll({
      where: {
        listId,
        blockedDates: {
          $between: [startDate, endDate]
        }
      },
      raw: true
    });
   console.log("checkAvailableDates",checkAvailableDates)
    const isBlocked = checkAvailableDates && checkAvailableDates.length > 0 ? checkAvailableDates.filter(o => o.calendarStatus == "blocked") : [];
    return {
      status: isBlocked && isBlocked.length > 0 ? "NotAvailable" : "Available"
    }
  },
};

export default DateAvailability;
