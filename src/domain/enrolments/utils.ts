import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { scroller } from 'react-scroll';

import { ROUTES } from '../../constants';
import {
  AttendeeStatus,
  EnrolmentFieldsFragment,
  EnrolmentsQueryVariables,
  RegistrationFieldsFragment,
} from '../../generated/graphql';
import { Language, PathBuilderProps } from '../../types';
import getPageHeaderHeight from '../../utils/getPageHeaderHeight';
import queryBuilder from '../../utils/queryBuilder';
import setFocusToFirstFocusable from '../../utils/setFocusToFirstFocusable';
import { REGISTRATION_SEARCH_PARAMS } from '../registrations/constants';
import { EnrolmentFields, EnrolmentSearchInitialValues } from './types';

export const getEnrolmentSearchInitialValues = (
  search: string
): EnrolmentSearchInitialValues => {
  const searchParams = new URLSearchParams(search);
  const attendeePage = searchParams.get(
    REGISTRATION_SEARCH_PARAMS.ATTENDEE_PAGE
  );
  const waitingPage = searchParams.get(REGISTRATION_SEARCH_PARAMS.WAITING_PAGE);
  const text = searchParams.get(REGISTRATION_SEARCH_PARAMS.ENROLMENT_TEXT);

  return {
    attendeePage: Number(attendeePage) || 1,
    enrolmentText: text || '',
    waitingPage: Number(waitingPage) || 1,
  };
};

export const getEnrolmentFields = ({
  enrolment,
  language,
  registration,
}: {
  enrolment: EnrolmentFieldsFragment;
  language: Language;
  registration: RegistrationFieldsFragment;
}): EnrolmentFields => {
  const id = enrolment.id || '';
  /* istanbul ignore next */
  const registrationId = registration.id || '';

  return {
    id,
    attendeeStatus: enrolment.attendeeStatus as AttendeeStatus,
    email: enrolment.email ?? '',
    enrolmentUrl: `/${language}${ROUTES.EDIT_REGISTRATION_ENROLMENT.replace(
      ':registrationId',
      registrationId
    ).replace(':enrolmentId', id)}`,
    name: enrolment.name ?? '',
    phoneNumber: enrolment.phoneNumber ?? '',
  };
};

export const getEnrolmentItemId = (id: string): string =>
  `enrolment-item-${id}`;

export const scrollToEnrolmentItem = (id: string): void => {
  const offset = 24;
  const duration = 300;

  scroller.scrollTo(id, {
    delay: 50,
    duration: 300,
    offset: 0 - (getPageHeaderHeight() + offset),
    smooth: true,
  });

  setTimeout(() => setFocusToFirstFocusable(id), duration);
};

export const clearEnrolmentsQueries = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): boolean =>
  apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'enrolments' });

export const enrolmentsPathBuilder = ({
  args,
}: PathBuilderProps<EnrolmentsQueryVariables>): string => {
  const { attendeeStatus, events, registrations, text } = args;

  const variableToKeyItems = [
    { key: 'attendee_status', value: attendeeStatus },
    { key: 'events', value: events },
    { key: 'registrations', value: registrations },
    { key: 'text', value: text },
  ];

  const query = queryBuilder(variableToKeyItems);

  return `/signup/${query}`;
};
