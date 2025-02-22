import copyToClipboard from 'copy-to-clipboard';
import React from 'react';
import { toast } from 'react-toastify';

import { ROUTES } from '../../../../constants';
import { fakeAuthenticatedAuthContextValue } from '../../../../utils/mockAuthContextValue';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import { AuthContextProps } from '../../../auth/types';
import { mockedOrganizationAncestorsResponse } from '../../../organization/__mocks__/organizationAncestors';
import { mockedUserResponse } from '../../../user/__mocks__/user';
import {
  publisher,
  registration,
  registrationId,
} from '../../__mocks__/editRegistrationPage';
import EditButtonPanel, { EditButtonPanelProps } from '../EditButtonPanel';

configure({ defaultHidden: true });
jest.mock('copy-to-clipboard');

const defaultProps: EditButtonPanelProps = {
  onDelete: jest.fn(),
  onUpdate: jest.fn(),
  publisher,
  registration,
  saving: null,
};

const authContextValue = fakeAuthenticatedAuthContextValue();
const mocks = [mockedOrganizationAncestorsResponse, mockedUserResponse];

const renderComponent = ({
  authContextValue,
  props,
  route = `/fi/${ROUTES.EDIT_REGISTRATION}`,
}: {
  authContextValue?: AuthContextProps;
  props?: Partial<EditButtonPanelProps>;
  route?: string;
} = {}) =>
  render(<EditButtonPanel {...defaultProps} {...props} />, {
    authContextValue,
    mocks,
    routes: [route],
  });

const findElement = (key: 'delete' | 'showEnrolments') => {
  switch (key) {
    case 'delete':
      return screen.findByRole('button', { name: 'Poista ilmoittautuminen' });
    case 'showEnrolments':
      return screen.findByRole('button', { name: /näytä ilmoittautuneet/i });
  }
};

const getElement = (
  key:
    | 'back'
    | 'copy'
    | 'copyLink'
    | 'delete'
    | 'menu'
    | 'showEnrolments'
    | 'toggle'
    | 'update'
) => {
  switch (key) {
    case 'back':
      return screen.getByRole('button', { name: /takaisin/i });
    case 'copy':
      return screen.getByRole('button', { name: /kopioi pohjaksi/i });
    case 'copyLink':
      return screen.getByRole('button', { name: /kopioi linkk/i });
    case 'delete':
      return screen.getByRole('button', { name: 'Poista ilmoittautuminen' });
    case 'menu':
      return screen.getByRole('region', { name: /valinnat/i });
    case 'showEnrolments':
      return screen.getByRole('button', { name: /näytä ilmoittautuneet/i });
    case 'toggle':
      return screen.getByRole('button', { name: /valinnat/i });
    case 'update':
      return screen.getByRole('button', { name: 'Tallenna muutokset' });
  }
};

const openMenu = async () => {
  const user = userEvent.setup();
  const toggleButton = getElement('toggle');
  await user.click(toggleButton);
  getElement('menu');

  return toggleButton;
};

test('should toggle menu by clicking actions button', async () => {
  const user = userEvent.setup();
  renderComponent({ authContextValue });

  const toggleButton = await openMenu();
  await user.click(toggleButton);
  expect(
    screen.queryByRole('region', { name: /valinnat/i })
  ).not.toBeInTheDocument();
});

test('should render all buttons when user is authenticated', async () => {
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  const user = userEvent.setup();
  renderComponent({ props: { onDelete, onUpdate }, authContextValue });

  await openMenu();

  await findElement('showEnrolments');
  getElement('copy');
  getElement('copyLink');

  const deleteButton = await findElement('delete');
  await user.click(deleteButton);
  expect(onDelete).toBeCalled();

  const updateButton = getElement('update');
  await user.click(updateButton);
  expect(onUpdate).toBeCalled();
});

test('only copy and copy link buttons should be enabled when user is not logged in', async () => {
  renderComponent();

  await openMenu();

  getElement('copy');
  getElement('copyLink');

  const disabledButtons = [
    getElement('showEnrolments'),
    getElement('delete'),
    getElement('update'),
  ];
  expect(disabledButtons).toHaveLength(3);
  disabledButtons.forEach((button) => expect(button).toBeDisabled());
});

test('should route to enrolments page when clicking show enrolments button', async () => {
  const user = userEvent.setup();
  const { history } = renderComponent({ authContextValue });

  await openMenu();

  const showEnrolmentsButton = await findElement('showEnrolments');
  await user.click(showEnrolmentsButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe(
      `/fi/registrations/${registration.id}/enrolments`
    )
  );
});

test('should route to create registration page when clicking copy button', async () => {
  const user = userEvent.setup();
  const { history } = renderComponent();

  await openMenu();

  const copyButton = getElement('copy');
  await user.click(copyButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe('/fi/registrations/create')
  );
});

test('should copy registration link to clipboard', async () => {
  toast.success = jest.fn();
  const user = userEvent.setup();
  renderComponent();

  await openMenu();

  const copyLinkButton = getElement('copyLink');
  await user.click(copyLinkButton);

  expect(copyToClipboard).toBeCalledWith(
    `https://linkedregistrations-ui.test.kuva.hel.ninja/fi/registration/${registrationId}/enrolment/create`
  );
  expect(toast.success).toBeCalledWith('Ilmoittautumislinkki kopioitu');
});

test('should route to search page when clicking back button', async () => {
  const user = userEvent.setup();
  const { history } = renderComponent();

  const backButton = getElement('back');
  await user.click(backButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe('/fi/registrations')
  );
});

test('should route to page defined in returnPath when clicking back button', async () => {
  const user = userEvent.setup();
  const { history } = renderComponent({
    route: `/fi${ROUTES}?returnPath=${ROUTES.SEARCH}&returnPath=${ROUTES.REGISTRATIONS}`,
  });

  const backButton = getElement('back');
  await user.click(backButton);

  await waitFor(() =>
    expect(history.location.pathname).toBe('/fi/registrations')
  );
  expect(history.location.search).toBe(`?returnPath=%2Fsearch`);
});

test('menu toggle button should be visible and accessible for mobile devices', async () => {
  global.innerWidth = 500;
  renderComponent();

  getElement('toggle');
});
