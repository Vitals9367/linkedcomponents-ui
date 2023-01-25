/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloError } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import React from 'react';

import { ROUTES } from '../../../constants';
import {
  CreateSeatsReservationDocument,
  UpdateSeatsReservationDocument,
} from '../../../generated/graphql';
import { fakeAuthenticatedAuthContextValue } from '../../../utils/mockAuthContextValue';
import { fakeSeatsReservation } from '../../../utils/mockDataUtils';
import {
  act,
  configure,
  loadingSpinnerIsNotInDocument,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { mockedEventResponse } from '../../event/__mocks__/event';
import { mockedLanguagesResponse } from '../../language/__mocks__/language';
import {
  mockedRegistrationResponse,
  registration,
  registrationId,
} from '../../registration/__mocks__/registration';
import { TEST_SEATS_RESERVATION_CODE } from '../../reserveSeats/constants';
import { mockedUserResponse } from '../../user/__mocks__/user';
import {
  enrolmentValues,
  mockedCreateEnrolmentResponse,
  mockedInvalidCreateEnrolmentResponse,
} from '../__mocks__/createEnrolmentPage';
import CreateEnrolmentPage from '../CreateEnrolmentPage';

configure({ defaultHidden: true });

beforeEach(() => {
  // values stored in tests will also be available in other tests unless you run
  localStorage.clear();
  sessionStorage.clear();
});

const findElement = (key: 'nameInput' | 'submitButton') => {
  switch (key) {
    case 'nameInput':
      return screen.findByLabelText(/nimi/i);
    case 'submitButton':
      return screen.findByRole('button', { name: /tallenna osallistuja/i });
  }
};

const getElement = (
  key:
    | 'cityInput'
    | 'confirmDeleteModal'
    | 'dateOfBirthInput'
    | 'emailCheckbox'
    | 'emailInput'
    | 'nameInput'
    | 'nativeLanguageButton'
    | 'participantAmountInput'
    | 'phoneCheckbox'
    | 'phoneInput'
    | 'serviceLanguageButton'
    | 'streetAddressInput'
    | 'submitButton'
    | 'updateParticipantAmountButton'
    | 'zipInput'
) => {
  switch (key) {
    case 'cityInput':
      return screen.getByLabelText(/kaupunki/i);
    case 'confirmDeleteModal':
      return screen.getByRole('dialog', {
        name: 'Vahvista osallistujan poistaminen',
      });
    case 'dateOfBirthInput':
      return screen.getByLabelText(/syntymäaika/i);
    case 'emailCheckbox':
      return screen.getByLabelText(/sähköpostilla/i);
    case 'emailInput':
      return screen.getByLabelText(/sähköpostiosoite/i);
    case 'nameInput':
      return screen.getByLabelText(/nimi/i);
    case 'nativeLanguageButton':
      return screen.getByRole('button', { name: /äidinkieli/i });
    case 'participantAmountInput':
      return screen.getByRole('spinbutton', {
        name: /ilmoittautujien määrä \*/i,
      });
    case 'phoneCheckbox':
      return screen.getByLabelText(/tekstiviestillä/i);
    case 'phoneInput':
      return screen.getByLabelText(/puhelinnumero/i);
    case 'serviceLanguageButton':
      return screen.getByRole('button', { name: /asiointikieli/i });
    case 'streetAddressInput':
      return screen.getByLabelText(/katuosoite/i);
    case 'submitButton':
      return screen.getByRole('button', { name: /tallenna osallistuja/i });
    case 'updateParticipantAmountButton':
      return screen.getByRole('button', { name: /päivitä/i });
    case 'zipInput':
      return screen.getByLabelText(/postinumero/i);
  }
};

const authContextValue = fakeAuthenticatedAuthContextValue();

const code = TEST_SEATS_RESERVATION_CODE;

const createSeatsReservationPayload = {
  registration: registration.id,
  seats: 1,
  waitlist: true,
};

const seatsReservation = fakeSeatsReservation({ code });

const getCreateSeatsReservationMock = (seats: number): MockedResponse => {
  const createSeatsReservationVariables = {
    input: { ...createSeatsReservationPayload, seats },
  };

  const createEnrolmentResponse = {
    data: {
      createSeatsReservation: {
        ...seatsReservation,
        seats,
        seatsAtEvent: seats,
      },
    },
  };

  return {
    request: {
      query: CreateSeatsReservationDocument,
      variables: createSeatsReservationVariables,
    },
    result: createEnrolmentResponse,
  };
};

const updateSeatsReservationPayload = {
  code,
  registration: registration.id,
  seats: 1,
  waitlist: true,
};

const getUpdateSeatsReservationMock = (seats: number): MockedResponse => {
  const updateSeatsReservationVariables = {
    input: { ...updateSeatsReservationPayload, seats },
  };

  const updateEnrolmentResponse = {
    data: {
      updateSeatsReservation: {
        ...seatsReservation,
        seats,
        seatsAtEvent: seats,
      },
    },
  };

  return {
    request: {
      query: UpdateSeatsReservationDocument,
      variables: updateSeatsReservationVariables,
    },
    result: updateEnrolmentResponse,
  };
};

const getUpdateSeatsReservationErrorMock = (seats: number): MockedResponse => {
  const updateSeatsReservationVariables = {
    input: { ...updateSeatsReservationPayload, seats },
  };

  const error = new ApolloError({
    networkError: { result: 'Not enough seats available.' } as any,
  });

  return {
    request: {
      query: UpdateSeatsReservationDocument,
      variables: updateSeatsReservationVariables,
    },
    error,
  };
};

const defaultMocks = [
  mockedEventResponse,
  mockedEventResponse,
  mockedLanguagesResponse,
  mockedRegistrationResponse,
  mockedUserResponse,
  getCreateSeatsReservationMock(1),
];

const route = ROUTES.CREATE_ENROLMENT.replace(
  ':registrationId',
  registrationId
);

const renderComponent = (mocks: MockedResponse[] = defaultMocks) =>
  renderWithRoute(<CreateEnrolmentPage />, {
    authContextValue,
    mocks,
    routes: [route],
    path: ROUTES.CREATE_ENROLMENT,
  });

const waitLoadingAndFindNameInput = async () => {
  await loadingSpinnerIsNotInDocument();
  const nameInput = await findElement('nameInput');
  return nameInput;
};

const enterFormValues = async () => {
  const user = userEvent.setup();

  const nameInput = await waitLoadingAndFindNameInput();
  const streetAddressInput = getElement('streetAddressInput');
  const dateOfBirthInput = getElement('dateOfBirthInput');
  const zipInput = getElement('zipInput');
  const cityInput = getElement('cityInput');
  const emailInput = getElement('emailInput');
  const phoneInput = getElement('phoneInput');
  const emailCheckbox = getElement('emailCheckbox');
  const phoneCheckbox = getElement('phoneCheckbox');
  const nativeLanguageButton = getElement('nativeLanguageButton');
  const serviceLanguageButton = getElement('serviceLanguageButton');

  await act(async () => await user.type(nameInput, enrolmentValues.name));
  await act(
    async () =>
      await user.type(streetAddressInput, enrolmentValues.streetAddress)
  );
  await act(
    async () => await user.type(dateOfBirthInput, enrolmentValues.dateOfBirth)
  );
  await act(async () => await user.type(zipInput, enrolmentValues.zip));
  await act(async () => await user.type(cityInput, enrolmentValues.city));
  await act(async () => await user.click(emailCheckbox));
  await act(async () => await user.type(emailInput, enrolmentValues.email));
  await act(async () => await user.click(phoneCheckbox));
  await act(async () => await user.type(phoneInput, enrolmentValues.phone));
  await act(async () => await user.click(nativeLanguageButton));
  const nativeLanguageOption = await screen.findByRole('option', {
    name: /suomi/i,
  });
  await act(async () => await user.click(nativeLanguageOption));
  await act(async () => await user.click(serviceLanguageButton));
  const serviceLanguageOption = await screen.findByRole('option', {
    name: /suomi/i,
  });
  await act(async () => await user.click(serviceLanguageOption));
};

test('should validate enrolment form and focus to invalid field and finally create enrolment', async () => {
  const user = userEvent.setup();

  const { history } = renderComponent([
    ...defaultMocks,
    mockedCreateEnrolmentResponse,
  ]);

  const nameInput = await waitLoadingAndFindNameInput();
  const streetAddressInput = getElement('streetAddressInput');
  const dateOfBirthInput = getElement('dateOfBirthInput');
  const zipInput = getElement('zipInput');
  const cityInput = getElement('cityInput');
  const emailInput = getElement('emailInput');
  const phoneInput = getElement('phoneInput');
  const emailCheckbox = getElement('emailCheckbox');
  const phoneCheckbox = getElement('phoneCheckbox');
  const nativeLanguageButton = getElement('nativeLanguageButton');
  const serviceLanguageButton = getElement('serviceLanguageButton');
  const submitButton = await findElement('submitButton');

  await act(async () => await user.type(nameInput, enrolmentValues.name));
  await act(
    async () =>
      await user.type(streetAddressInput, enrolmentValues.streetAddress)
  );
  await act(
    async () => await user.type(dateOfBirthInput, enrolmentValues.dateOfBirth)
  );
  await act(async () => await user.type(zipInput, enrolmentValues.zip));
  await act(async () => await user.type(cityInput, enrolmentValues.city));
  await act(async () => await user.click(submitButton));

  await waitFor(() => expect(emailCheckbox).toHaveFocus());
  expect(emailInput).not.toBeRequired();

  await act(async () => await user.click(emailCheckbox));
  await act(async () => await user.click(submitButton));

  await waitFor(() => expect(emailInput).toHaveFocus());
  expect(emailInput).toBeRequired();
  expect(phoneInput).not.toBeRequired();

  await act(async () => await user.type(emailInput, enrolmentValues.email));
  await act(async () => await user.click(phoneCheckbox));
  await act(async () => await user.click(submitButton));

  await waitFor(() => expect(phoneInput).toHaveFocus());
  expect(phoneInput).toBeRequired();

  await act(async () => await user.type(phoneInput, enrolmentValues.phone));
  await act(async () => await user.click(submitButton));

  await waitFor(() => expect(nativeLanguageButton).toHaveFocus());

  await act(async () => await user.click(nativeLanguageButton));
  const nativeLanguageOption = await screen.findByRole('option', {
    name: /suomi/i,
  });
  await act(async () => await user.click(nativeLanguageOption));
  await act(async () => await user.click(serviceLanguageButton));
  const serviceLanguageOption = await screen.findByRole('option', {
    name: /suomi/i,
  });
  await act(async () => await user.click(serviceLanguageOption));
  await act(async () => await user.click(submitButton));

  await waitFor(() =>
    expect(history.location.pathname).toBe(
      `/fi/registrations/${registration.id}/enrolments`
    )
  );
});

test('should show server errors', async () => {
  const user = userEvent.setup();
  renderComponent([...defaultMocks, mockedInvalidCreateEnrolmentResponse]);

  const submitButton = await findElement('submitButton');

  await enterFormValues();
  await act(async () => await user.click(submitButton));

  await screen.findByText(/lomakkeella on seuraavat virheet/i);
  screen.getByText(/Tämän kentän arvo ei voi olla "null"./i);
});

test('should add and delete participants', async () => {
  const user = userEvent.setup();

  renderComponent([
    ...defaultMocks,
    getUpdateSeatsReservationMock(1),
    getUpdateSeatsReservationMock(2),
  ]);

  await waitLoadingAndFindNameInput();

  const participantAmountInput = getElement('participantAmountInput');
  const updateParticipantAmountButton = getElement(
    'updateParticipantAmountButton'
  );

  expect(
    screen.queryByRole('button', { name: 'Osallistuja 2' })
  ).not.toBeInTheDocument();

  await act(async () => await user.clear(participantAmountInput));
  await act(async () => await user.type(participantAmountInput, '2'));
  await act(async () => await user.click(updateParticipantAmountButton));

  screen.getByRole('button', { name: 'Osallistuja 2' });

  await act(async () => await user.clear(participantAmountInput));
  await act(async () => await user.type(participantAmountInput, '1'));
  await act(async () => await user.click(updateParticipantAmountButton));

  const confirmDeleteButton = within(
    getElement('confirmDeleteModal')
  ).getByRole('button', { name: 'Poista osallistuja' });
  await act(async () => await user.click(confirmDeleteButton));

  expect(
    screen.queryByRole('button', { name: 'Osallistuja 2' })
  ).not.toBeInTheDocument();
});

test('should show server errors when updating seats reservation fails', async () => {
  const user = userEvent.setup();

  renderComponent([...defaultMocks, getUpdateSeatsReservationErrorMock(2)]);

  await waitLoadingAndFindNameInput();

  const participantAmountInput = getElement('participantAmountInput');
  const updateParticipantAmountButton = getElement(
    'updateParticipantAmountButton'
  );

  expect(
    screen.queryByRole('button', { name: 'Osallistuja 2' })
  ).not.toBeInTheDocument();

  await act(async () => await user.clear(participantAmountInput));
  await act(async () => await user.type(participantAmountInput, '2'));
  await act(async () => await user.click(updateParticipantAmountButton));

  await screen.findByText('Paikkoja ei ole riittävästi jäljellä.');
});

test('should show and hide participant specific fields', async () => {
  const user = userEvent.setup();

  renderComponent();

  const nameInput = await waitLoadingAndFindNameInput();
  const toggleButton = screen.getByRole('button', {
    name: 'Osallistuja 1',
  });

  await act(async () => await user.click(toggleButton));
  expect(nameInput).not.toBeInTheDocument();

  await act(async () => await user.click(toggleButton));
  getElement('nameInput');
});

test('should delete participants by clicking delete participant button', async () => {
  const user = userEvent.setup();

  renderComponent([
    ...defaultMocks,
    getUpdateSeatsReservationMock(1),
    getUpdateSeatsReservationMock(2),
  ]);

  await waitLoadingAndFindNameInput();

  const participantAmountInput = getElement('participantAmountInput');
  const updateParticipantAmountButton = getElement(
    'updateParticipantAmountButton'
  );

  expect(
    screen.queryByRole('button', { name: 'Osallistuja 2' })
  ).not.toBeInTheDocument();

  await act(async () => await user.clear(participantAmountInput));
  await act(async () => await user.type(participantAmountInput, '2'));
  await act(async () => await user.click(updateParticipantAmountButton));

  screen.getByRole('button', { name: 'Osallistuja 2' });

  const deleteButton = screen.getAllByRole('button', {
    name: /poista osallistuja/i,
  })[1];
  await act(async () => await user.click(deleteButton));

  const deleteParticipantButton = within(
    getElement('confirmDeleteModal')
  ).getByRole('button', { name: 'Poista osallistuja' });
  await act(async () => await user.click(deleteParticipantButton));

  expect(
    screen.queryByRole('button', { name: 'Osallistuja 2' })
  ).not.toBeInTheDocument();
});

test('should show server errors when updating seats reservation fails', async () => {
  const user = userEvent.setup();

  renderComponent([
    ...defaultMocks,
    getUpdateSeatsReservationMock(3),
    getUpdateSeatsReservationErrorMock(2),
  ]);

  await waitLoadingAndFindNameInput();

  const participantAmountInput = getElement('participantAmountInput');
  const updateParticipantAmountButton = getElement(
    'updateParticipantAmountButton'
  );

  await act(async () => await user.clear(participantAmountInput));
  await act(async () => await user.type(participantAmountInput, '3'));
  await act(async () => await user.click(updateParticipantAmountButton));

  await screen.findByRole('button', { name: 'Osallistuja 3' });

  const deleteButton = screen.getAllByRole('button', {
    name: /poista osallistuja/i,
  })[1];
  await act(async () => await user.click(deleteButton));

  const dialog = screen.getByRole('dialog', {
    name: 'Vahvista osallistujan poistaminen',
  });
  const deleteParticipantButton = within(dialog).getByRole('button', {
    name: 'Poista osallistuja',
  });
  await act(async () => await user.click(deleteParticipantButton));

  await screen.findByText('Paikkoja ei ole riittävästi jäljellä.');
});
