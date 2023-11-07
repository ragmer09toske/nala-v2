import React from 'react';
import Layout from '../../components/Layout';
import ViewListing from './ViewListing';
import NotFound from '../notFound/NotFound';
import fetch from '../../core/fetch';
import { url, fileuploadDir } from '../../config.js';
import moment from 'moment';
import { checkAvailability } from '../../actions/checkAvailability';
import { setPersonalizedValues } from '../../actions/personalized';

const title = 'View Listing';

function renderNotFound() {
  return {
    title,
    component: <Layout><NotFound title={title} /></Layout>,
    status: 404,
  };
}

export default async function action({ store, params, query }) {


  let listTitle, listDescription, listPhoto, lat, lng, startDate, endDate;
  let startTime, endTime;
  const baseCurrency = store.getState().currency.base;
  const isAdmin = store.getState().runtime.isAdminAuthenticated;

  const getListquery = `
      query GetListMeta($listId: Int!) {
        getListMeta(listId: $listId) {
          id
          title
          description
          isPublished
          listPhotos {
            id
            name
          }
          status
          lat
          lng
          listingData {
            maxDay
            minDay
          }
        }
      }
    `;

  // From URI
  let listURL = params.listId, listId, listURLData, preview = false, URLRoomType = false, maximumNights = 0, currentDay;

  if (params.preview) preview = true;

  if (listURL && listURL.indexOf('-') >= 0) {
    listURLData = listURL.split('-');
    listId = listURLData[listURLData.length - 1];
  } else {
    listId = listURL;
  }

  if (listId === undefined || isNaN(listId)) {
    renderNotFound();
    return;
  }

  // const dates = params.dates;
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: getListquery,
      variables: { listId }
    }),
  });
  const { data } = await resp.json();

  currentDay = moment().format('YYYY-MM-DD')

  if ('startdate' in query && 'enddate' in query) {
    startDate = moment(query.startdate).format("YYYY-MM-DD");
    endDate = moment(query.enddate).format("YYYY-MM-DD");
    if (currentDay > startDate || currentDay > endDate || startDate > endDate || startDate == 'Invalid date' || endDate == 'Invalid date') {
      renderNotFound();
      return;
    }
    store.dispatch(setPersonalizedValues({ name: 'startDate', value: startDate }));
    store.dispatch(setPersonalizedValues({ name: 'endDate', value: endDate }));
  } else if ('startdate' in query || 'enddate' in query) {
    renderNotFound();
    return;
  }

  if ('address' in query) {
    store.dispatch(setPersonalizedValues({ name: 'location', value: query.address }));
  }

  if ('startTime' in query && 'endTime' in query) {
    startTime = query.startTime
    endTime = query.endTime;
  }

  if ('roomType' in query) URLRoomType = query.roomType;

  if (data && data.getListMeta) {
    if (!data.getListMeta.isPublished && !preview && !isAdmin) {
      renderNotFound();
      return;
    }
    listTitle = data.getListMeta.title;
    listDescription = data.getListMeta.description;
    lat = data.getListMeta.lat;
    lng = data.getListMeta.lng;
    maximumNights = data && data.getListMeta && data.getListMeta.listingData && data.getListMeta.listingData.maxDay ? data.getListMeta.listingData.maxDay : 0;
    if (data.getListMeta.listPhotos && data.getListMeta.listPhotos.length > 0) {
      listPhoto = url + '/' + fileuploadDir + data.getListMeta.listPhotos[0].name;
    }
    if (startDate && endDate) await store.dispatch(checkAvailability(listId, startDate, endDate, maximumNights));
  } else {
    renderNotFound();
    return;
  }

  let viewListingBottom = 'viewListingBottom';

  return {
    title: listTitle || title,
    description: listDescription || '',
    image: listPhoto || '',
    component: <Layout viewListingBottom={viewListingBottom}><ViewListing
      title={title}
      preview={preview}
      lat={lat}
      lng={lng}
      listId={Number(listId)}
      startDate={startDate}
      endDate={endDate}
      baseCurrency={baseCurrency}
      URLRoomType={URLRoomType}
      startTime={startTime}
      endTime={endTime}
    /></Layout>,
  };
};
