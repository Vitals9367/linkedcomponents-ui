/* eslint-disable @typescript-eslint/no-require-imports */
import { MockedResponse } from '@apollo/client/testing';
import addSeconds from 'date-fns/addSeconds';
import subSeconds from 'date-fns/subSeconds';
import React from 'react';

import { RESERVATION_NAMES } from '../../../../constants';
import {
  CreateSeatsReservationDocument,
  SeatsReservation,
} from '../../../../generated/graphql';
import { fakeSeatsReservation } from '../../../../utils/mockDataUtils';
import {
  render,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../../utils/testUtils';
import { registration } from '../../../registration/__mocks__/registration';
import { EnrolmentPageProvider } from '../../enrolmentPageContext/EnrolmentPageContext';
import {
  EnrolmentServerErrorsContext,
  EnrolmentServerErrorsContextProps,
} from '../../enrolmentServerErrorsContext/EnrolmentServerErrorsContext';
import ReservationTimer from '../ReservationTimer';

const mockedUseNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedUseNavigate,
}));

const defaultServerErrorsProps: EnrolmentServerErrorsContextProps = {
  serverErrorItems: [],
  setServerErrorItems: jest.fn(),
  showServerErrors: jest.fn(),
};

const payload = {
  registration: registration.id,
  seats: 1,
  waitlist: true,
};

const createSeatsReservationVariables = { input: payload };

const renderComponent = (
  serverErrorProps?: Partial<EnrolmentServerErrorsContextProps>,
  mocks: MockedResponse[] = []
) =>
  render(
    <EnrolmentPageProvider>
      <EnrolmentServerErrorsContext.Provider
        value={{ ...defaultServerErrorsProps, ...serverErrorProps }}
      >
        <ReservationTimer
          attendees={[]}
          callbacksDisabled={false}
          disableCallbacks={jest.fn()}
          initReservationData={true}
          registration={registration}
          setAttendees={jest.fn()}
        />
      </EnrolmentServerErrorsContext.Provider>
    </EnrolmentPageProvider>,
    { mocks }
  );

beforeEach(() => {
  jest.resetAllMocks();
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
  sessionStorage.clear();
});

const setSessionStorageValues = (reservation: SeatsReservation) => {
  jest.spyOn(sessionStorage, 'getItem').mockImplementation((key: string) => {
    switch (key) {
      case `${RESERVATION_NAMES.ENROLMENT_RESERVATION}-${registration.id}`:
        return reservation ? JSON.stringify(reservation) : '';
      default:
        return '';
    }
  });
};

const getReservationData = (expirationOffset: number) => {
  const now = new Date();
  let expiration = '';

  if (expirationOffset) {
    expiration = addSeconds(now, expirationOffset).toISOString();
  } else {
    expiration = subSeconds(now, expirationOffset).toISOString();
  }

  const reservation = fakeSeatsReservation({ expiration });

  return reservation;
};

const getSeatsReservationErrorMock = (error: Error): MockedResponse => {
  return {
    request: {
      query: CreateSeatsReservationDocument,
      variables: createSeatsReservationVariables,
    },
    error,
  };
};

const createSeatsReservationPayload = {
  registration: registration.id,
  seats: 1,
  waitlist: true,
};

const getCreateSeatsReservationMock = (
  seatsReservation: SeatsReservation
): MockedResponse => {
  const createSeatsReservationVariables = {
    input: { ...createSeatsReservationPayload, seats: seatsReservation.seats },
  };

  const createEnrolmentResponse = {
    data: { createSeatsReservation: seatsReservation },
  };

  return {
    request: {
      query: CreateSeatsReservationDocument,
      variables: createSeatsReservationVariables,
    },
    result: createEnrolmentResponse,
  };
};

test('should show server errors when creating seats reservation fails', async () => {
  const showServerErrors = jest.fn();
  const error = new Error();
  const mocks = [getSeatsReservationErrorMock(error)];
  renderComponent({ showServerErrors }, mocks);

  await waitFor(() =>
    expect(showServerErrors).toBeCalledWith({ error }, 'seatsReservation')
  );
});

test('should show modal if any of the reserved seats is in waiting list', async () => {
  const user = userEvent.setup();
  const mocks = [
    getCreateSeatsReservationMock(
      fakeSeatsReservation({
        seats: 1,
        waitlistSpots: 1,
        seatsAtEvent: 0,
      })
    ),
  ];
  renderComponent(undefined, mocks);

  const modal = await screen.findByRole('dialog', {
    name: 'Ilmoittautujia on lisätty varausjonoon',
  });

  await user.click(within(modal).getByRole('button', { name: 'Sulje' }));

  await waitFor(() => expect(modal).not.toBeInTheDocument());
});

test('should route to create enrolment page if reservation is expired', async () => {
  const user = userEvent.setup();

  setSessionStorageValues(getReservationData(-1000));

  renderComponent();
  const modal = await screen.findByRole(
    'dialog',
    { name: 'Varausaika on täynnä.' },
    { timeout: 5000 }
  );
  const tryAgainButton = within(modal).getByRole('button', {
    name: 'Yritä uudelleen',
  });

  await user.click(tryAgainButton);

  await waitFor(() => expect(mockedUseNavigate).toBeCalledWith(0));
});
