import { SEND_MESSAGE_FORM_NAME } from '../enrolments/constants';
import {
  ATTENDEE_FIELDS,
  ENROLMENT_FIELDS,
  SEND_MESSAGE_FIELDS,
} from './constants';

export type AttendeeFields = {
  [ATTENDEE_FIELDS.CITY]: string;
  [ATTENDEE_FIELDS.DATE_OF_BIRTH]: Date | null;
  [ATTENDEE_FIELDS.EXTRA_INFO]: string;
  [ATTENDEE_FIELDS.IN_WAITING_LIST]: boolean;
  [ATTENDEE_FIELDS.NAME]: string;
  [ATTENDEE_FIELDS.STREET_ADDRESS]: string;
  [ATTENDEE_FIELDS.ZIPCODE]: string;
};

export type EnrolmentFormFields = {
  [ENROLMENT_FIELDS.ATTENDEES]: AttendeeFields[];
  [ENROLMENT_FIELDS.EMAIL]: string;
  [ENROLMENT_FIELDS.EXTRA_INFO]: string;
  [ENROLMENT_FIELDS.MEMBERSHIP_NUMBER]: string;
  [ENROLMENT_FIELDS.NATIVE_LANGUAGE]: string;
  [ENROLMENT_FIELDS.NOTIFICATIONS]: string[];
  [ENROLMENT_FIELDS.PHONE_NUMBER]: string;
  [ENROLMENT_FIELDS.SERVICE_LANGUAGE]: string;
};

export type EnrolmentReservation = {
  expires: number;
  participants: number;
  started: number;
  session: string;
};

export type SendMessageFormFields = {
  [SEND_MESSAGE_FORM_NAME]: {
    [SEND_MESSAGE_FIELDS.BODY]: string;
    [SEND_MESSAGE_FIELDS.SUBJECT]: string;
  };
};
