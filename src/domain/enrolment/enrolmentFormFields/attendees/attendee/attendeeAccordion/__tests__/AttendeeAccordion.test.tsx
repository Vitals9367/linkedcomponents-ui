import React from 'react';

import {
  configure,
  render,
  screen,
  userEvent,
} from '../../../../../../../utils/testUtils';
import AttendeeAccordion, {
  AttendeeAccordionProps,
} from '../AttendeeAccordion';

configure({ defaultHidden: true });

const content = 'Accordion content';
const toggleButtonLabel = 'Toggle';

const defaultProps: AttendeeAccordionProps = {
  inWaitingList: false,
  onClick: jest.fn(),
  open: true,
  toggleButtonLabel,
};

const renderComponent = (props?: Partial<AttendeeAccordionProps>) =>
  render(
    <AttendeeAccordion {...defaultProps} {...props}>
      {content}
    </AttendeeAccordion>
  );

test('should not show content if accordion is not open', async () => {
  renderComponent({ open: false });

  expect(
    screen.queryByRole('region', { hidden: false })
  ).not.toBeInTheDocument();
});

test('should show content if accordion is open', async () => {
  renderComponent({ open: true });

  screen.getByRole('region', { hidden: false });
});

test('should not show in waiting list text if attendee is not in waiting list', async () => {
  renderComponent({ inWaitingList: false, open: true });

  expect(screen.queryByText('Varasija')).not.toBeInTheDocument();
});

test('should show in waiting list text if attendee is in waiting list', async () => {
  renderComponent({ inWaitingList: true, open: true });

  screen.getByText('Varasija');
});

test('should call onClick when clicking', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  renderComponent({ open: true, onClick });

  const toggleButton = screen.getByRole('button', { name: toggleButtonLabel });
  await user.click(toggleButton);
  expect(onClick).toBeCalled();
});

test('should call onClick by pressing enter', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();

  renderComponent({ open: true, onClick });

  const toggleButton = screen.getByRole('button', { name: toggleButtonLabel });
  await user.type(toggleButton, '{enter}');
  expect(onClick).toBeCalled();
});
