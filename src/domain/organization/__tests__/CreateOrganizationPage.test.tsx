import { MockedResponse } from '@apollo/client/testing';
import React from 'react';

import getValue from '../../../utils/getValue';
import { fakeAuthenticatedAuthContextValue } from '../../../utils/mockAuthContextValue';
import {
  actWait,
  configure,
  loadingSpinnerIsNotInDocument,
  render,
  screen,
  userEvent,
  waitFor,
  waitPageMetaDataToBeSet,
} from '../../../utils/testUtils';
import {
  mockedOrganizationClassesResponse,
  mockedOrganizationClassResponse,
  organizationClassName,
} from '../../organizationClass/__mocks__/organizationClass';
import {
  mockedOrganizationsResponse,
  organizations,
} from '../../organizations/__mocks__/organizationsPage';
import {
  mockedUserResponse,
  mockedUsersResponse,
} from '../../user/__mocks__/user';
import {
  mockedCreateOrganizationResponse,
  mockedInvalidCreateOrganizationResponse,
  organizationValues,
} from '../__mocks__/createOrganizationPage';
import CreateOrganizationPage from '../CreateOrganizationPage';

configure({ defaultHidden: true });

const authContextValue = fakeAuthenticatedAuthContextValue();

const defaultMocks = [
  mockedOrganizationsResponse,
  mockedOrganizationClassResponse,
  mockedOrganizationClassesResponse,
  mockedUserResponse,
  mockedUsersResponse,
];

const renderComponent = (mocks: MockedResponse[] = defaultMocks) =>
  render(<CreateOrganizationPage />, { authContextValue, mocks });

const getElement = (
  key:
    | 'classificationInput'
    | 'classificationToggleButton'
    | 'nameInput'
    | 'originIdInput'
    | 'parentInput'
    | 'parentToggleButton'
    | 'saveButton'
) => {
  switch (key) {
    case 'classificationInput':
      return screen.getByRole('combobox', { name: /luokittelu/i });
    case 'classificationToggleButton':
      return screen.getByRole('button', { name: /luokittelu: valikko/i });
    case 'nameInput':
      return screen.getByLabelText(/nimi/i);
    case 'originIdInput':
      return screen.getByLabelText(/lähdetunniste/i);
    case 'parentInput':
      return screen.getByRole('combobox', { name: /pääorganisaatio/i });
    case 'parentToggleButton':
      return screen.getByRole('button', { name: /pääorganisaatio: valikko/i });
    case 'saveButton':
      return screen.getByRole('button', { name: /tallenna/i });
  }
};

const fillClassificationField = async () => {
  const user = userEvent.setup();
  const classificationToggleButton = getElement('classificationToggleButton');
  await user.click(classificationToggleButton);

  const option = await screen.findByRole('option', {
    name: organizationClassName,
  });
  await user.click(option);
};

const fillParentField = async () => {
  const user = userEvent.setup();
  await user.click(getElement('parentToggleButton'));
  const organizationOption = await screen.findByRole('option', {
    name: getValue(organizations.data[0]?.name, ''),
  });
  await user.click(organizationOption);
};

const fillInputValues = async () => {
  const user = userEvent.setup();
  await user.type(getElement('originIdInput'), organizationValues.originId);
  await user.type(getElement('nameInput'), organizationValues.name);
  await fillClassificationField();
  await fillParentField();
};

test('applies expected metadata', async () => {
  const pageTitle = 'Lisää organisaatio - Linked Events';
  const pageDescription = 'Lisää uusi organisaatio Linked Eventsiin.';
  const pageKeywords =
    'lisää, uusi, organisaatio, linked, events, tapahtuma, hallinta, api, admin, Helsinki, Suomi';

  renderComponent(defaultMocks);

  await loadingSpinnerIsNotInDocument();

  await waitPageMetaDataToBeSet({ pageDescription, pageKeywords, pageTitle });
  await actWait(10);
});

test('should focus to first validation error when trying to save new organization', async () => {
  const user = userEvent.setup();
  renderComponent(defaultMocks);

  await loadingSpinnerIsNotInDocument();

  const originIdInput = getElement('originIdInput');
  const nameInput = getElement('nameInput');
  const parentInput = getElement('parentInput');
  const saveButton = getElement('saveButton');

  await user.click(saveButton);

  await waitFor(() => expect(originIdInput).toHaveFocus());

  await user.type(originIdInput, organizationValues.originId);
  await user.type(nameInput, organizationValues.name);
  await user.click(saveButton);

  await waitFor(() => expect(parentInput).toHaveFocus());
});

test('should move to organizations page after creating new organization', async () => {
  const user = userEvent.setup();
  const { history } = renderComponent([
    ...defaultMocks,
    mockedCreateOrganizationResponse,
    mockedOrganizationsResponse,
  ]);

  await loadingSpinnerIsNotInDocument();

  await fillInputValues();

  await user.click(getElement('saveButton'));

  await waitFor(
    () =>
      expect(history.location.pathname).toBe(
        `/fi/administration/organizations`
      ),
    { timeout: 10000 }
  );
});

test('should show server errors', async () => {
  const user = userEvent.setup();
  renderComponent([...defaultMocks, mockedInvalidCreateOrganizationResponse]);

  await loadingSpinnerIsNotInDocument();

  await fillInputValues();

  const saveButton = getElement('saveButton');
  await user.click(saveButton);

  await screen.findByText(/lomakkeella on seuraavat virheet/i, undefined, {
    timeout: 10000,
  });
  screen.getByText(/Tämän kentän arvo ei voi olla "null"./i);
});
