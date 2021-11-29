import { MockedResponse } from '@apollo/client/testing';

import { RegistrationDocument } from '../../../generated/graphql';
import { fakeRegistration } from '../../../utils/mockDataUtils';
import { attendees } from '../../enrolments/__mocks__/enrolmentsPage';
import { TEST_EVENT_ID } from '../../event/constants';
import { REGISTRATION_INCLUDES } from '../constants';

const registrationId = 'registration:1';

const registrationOverrides = {
  id: registrationId,
  audienceMaxAge: 18,
  audienceMinAge: 12,
  confirmationMessage: 'Confirmation message',
  enrolmentEndTime: '2020-09-30T16:00:00.000Z',
  enrolmentStartTime: '2020-09-27T15:00:00.000Z',
  event: TEST_EVENT_ID,
  instructions: 'Instructions',
  maximumAttendeeCapacity: 100,
  minimumAttendeeCapacity: 10,
  signups: attendees.data,
  waitingListCapacity: 5,
};

const registration = fakeRegistration(registrationOverrides);
const registrationVariables = {
  createPath: undefined,
  id: registrationId,
  include: REGISTRATION_INCLUDES,
};
const registrationResponse = { data: { registration } };
const mockedRegistrationResponse: MockedResponse = {
  request: { query: RegistrationDocument, variables: registrationVariables },
  result: registrationResponse,
};

export { mockedRegistrationResponse, registration, registrationId };
