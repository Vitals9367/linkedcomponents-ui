import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import {
  configure,
  render,
  screen,
  userEvent,
} from '../../../../../utils/testUtils';
import { EVENT_TYPE } from '../../../constants';
import { EventTime, RecurringEventSettings } from '../../../types';
import EventTimesSummary, {
  EventTimesSummaryProps,
} from '../EventTimesSummary';

configure({ defaultHidden: true });

const defaultProps: EventTimesSummaryProps = {
  eventType: EVENT_TYPE.EVENT,
  eventTimes: [],
  recurringEvents: [],
  setEventTimes: jest.fn(),
  setRecurringEvents: jest.fn(),
};

beforeEach(() => {
  clear();
});

const renderComponent = (props?: Partial<EventTimesSummaryProps>) =>
  render(<EventTimesSummary {...defaultProps} {...props} />);

test('should render event times summary', async () => {
  advanceTo('2021-04-12');
  const eventTimes: EventTime[] = [
    {
      endTime: new Date('2021-05-02T15:00:00.000Z'),
      id: null,
      startTime: new Date('2021-05-02T12:00:00.000Z'),
    },
    {
      endTime: new Date('2021-05-03T15:00:00.000Z'),
      id: null,
      startTime: new Date('2021-05-03T12:00:00.000Z'),
    },
  ];

  const recurringEvents: RecurringEventSettings[] = [
    {
      endDate: new Date('2021-05-07'),
      endTime: '12.00',
      eventTimes: [
        {
          endTime: new Date('2021-05-07T15:00:00.000Z'),
          id: null,
          startTime: new Date('2021-05-07T12:00:00.000Z'),
        },
        {
          endTime: new Date('2021-05-09T15:00:00.000Z'),
          id: null,
          startTime: new Date('2021-05-09T12:00:00.000Z'),
        },
      ],
      repeatDays: ['mon', 'wed'],
      repeatInterval: 1,
      startDate: new Date('2021-05-07'),
      startTime: '12.00',
    },
  ];
  renderComponent({ eventTimes, recurringEvents });

  const toggleButton = screen.getByRole('button', {
    name: 'Ma ja Ke, Viikon välein, 07.05.2021 – 07.05.2021',
  });
  userEvent.click(toggleButton);

  screen.getByText('07.05.2021 12.00 – 07.05.2021 15.00');
  screen.getByText('09.05.2021 12.00 – 09.05.2021 15.00');

  screen.getByText('02.05.2021 12.00 – 02.05.2021 15.00');
  screen.getByText('03.05.2021 12.00 – 03.05.2021 15.00');
});
