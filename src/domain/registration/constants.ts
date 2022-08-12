import { RegistrationFormFields } from './types';

export enum REGISTRATION_FIELDS {
  AUDIENCE_MAX_AGE = 'audienceMaxAge',
  AUDIENCE_MIN_AGE = 'audienceMinAge',
  CONFIRMATION_MESSAGE = 'confirmationMessage',
  ENROLMENT_END_TIME_DATE = 'enrolmentEndTimeDate',
  ENROLMENT_END_TIME_TIME = 'enrolmentEndTimeTime',
  ENROLMENT_START_TIME_DATE = 'enrolmentStartTimeDate',
  ENROLMENT_START_TIME_TIME = 'enrolmentStartTimeTime',
  EVENT = 'event',
  INSTRUCTIONS = 'instructions',
  MAXIMUM_ATTENDEE_CAPACITY = 'maximumAttendeeCapacity',
  MINIMUM_ATTENDEE_CAPACITY = 'minimumAttendeeCapacity',
  WAITING_LIST_CAPACITY = 'waitingListCapacity',
}

export const REGISTRATION_INITIAL_VALUES: RegistrationFormFields = {
  [REGISTRATION_FIELDS.AUDIENCE_MAX_AGE]: '',
  [REGISTRATION_FIELDS.AUDIENCE_MIN_AGE]: '',
  [REGISTRATION_FIELDS.CONFIRMATION_MESSAGE]: '',
  [REGISTRATION_FIELDS.ENROLMENT_END_TIME_DATE]: null,
  [REGISTRATION_FIELDS.ENROLMENT_END_TIME_TIME]: '',
  [REGISTRATION_FIELDS.ENROLMENT_START_TIME_DATE]: null,
  [REGISTRATION_FIELDS.ENROLMENT_START_TIME_TIME]: '',
  [REGISTRATION_FIELDS.EVENT]: '',
  [REGISTRATION_FIELDS.INSTRUCTIONS]: '',
  [REGISTRATION_FIELDS.MAXIMUM_ATTENDEE_CAPACITY]: '',
  [REGISTRATION_FIELDS.MINIMUM_ATTENDEE_CAPACITY]: '',
  [REGISTRATION_FIELDS.WAITING_LIST_CAPACITY]: '',
};

export const REGISTRATION_SELECT_FIELDS = [REGISTRATION_FIELDS.EVENT];

export const REGISTRATION_INCLUDES = ['signups'];
