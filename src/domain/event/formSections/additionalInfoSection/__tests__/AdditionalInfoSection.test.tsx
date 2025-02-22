import { Formik } from 'formik';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import {
  configure,
  render,
  screen,
  userEvent,
  within,
} from '../../../../../utils/testUtils';
import translations from '../../../../app/i18n/fi.json';
import { EVENT_FIELDS, EVENT_TYPE } from '../../../constants';
import { publicEventSchema } from '../../../validation';
import AdditionalInfoSection from '../AdditionalInfoSection';

configure({ defaultHidden: true });

const type = EVENT_TYPE.General;

type InitialValues = {
  [EVENT_FIELDS.AUDIENCE_MAX_AGE]: number | '';
  [EVENT_FIELDS.AUDIENCE_MIN_AGE]: number | '';
  [EVENT_FIELDS.ENROLMENT_END_TIME_DATE]: Date | null;
  [EVENT_FIELDS.ENROLMENT_END_TIME_TIME]: string;
  [EVENT_FIELDS.ENROLMENT_START_TIME_DATE]: Date | null;
  [EVENT_FIELDS.ENROLMENT_START_TIME_TIME]: string;
  [EVENT_FIELDS.MAXIMUM_ATTENDEE_CAPACITY]: number | '';
  [EVENT_FIELDS.MINIMUM_ATTENDEE_CAPACITY]: number | '';
  [EVENT_FIELDS.TYPE]: string;
};

const defaultInitialValues: InitialValues = {
  [EVENT_FIELDS.AUDIENCE_MAX_AGE]: '',
  [EVENT_FIELDS.AUDIENCE_MIN_AGE]: '',
  [EVENT_FIELDS.ENROLMENT_END_TIME_DATE]: null,
  [EVENT_FIELDS.ENROLMENT_END_TIME_TIME]: '',
  [EVENT_FIELDS.ENROLMENT_START_TIME_DATE]: null,
  [EVENT_FIELDS.ENROLMENT_START_TIME_TIME]: '',
  [EVENT_FIELDS.MAXIMUM_ATTENDEE_CAPACITY]: '',
  [EVENT_FIELDS.MINIMUM_ATTENDEE_CAPACITY]: '',
  [EVENT_FIELDS.TYPE]: type,
};

const renderComponent = (initialValues?: Partial<InitialValues>) =>
  render(
    <Formik
      initialValues={{ ...defaultInitialValues, ...initialValues }}
      onSubmit={jest.fn()}
      enableReinitialize={true}
      validationSchema={publicEventSchema}
    >
      <AdditionalInfoSection isEditingAllowed={true} />
    </Formik>
  );

afterAll(() => {
  clear();
});

const getElement = (
  key:
    | 'endTimeDate'
    | 'endTimeTime'
    | 'maxAge'
    | 'minAge'
    | 'maxCapacity'
    | 'minCapacity'
    | 'startTimeDate'
    | 'startTimeTime'
) => {
  switch (key) {
    case 'endTimeDate':
      return screen.getByLabelText('Ilmoittautuminen päättyy');
    case 'endTimeTime':
      const endTimeGroup = screen.getByRole('group', {
        name: /ilmoittautuminen päättyy klo/i,
      });
      return within(endTimeGroup).getByLabelText('tunnit');
    case 'maxAge':
      return screen.getByRole('spinbutton', { name: 'Yläikäraja' });
    case 'minAge':
      return screen.getByRole('spinbutton', { name: 'Alaikäraja' });
    case 'maxCapacity':
      return screen.getByRole('spinbutton', {
        name: 'Vähimmäisosallistujamäärä',
      });
    case 'minCapacity':
      return screen.getByRole('spinbutton', {
        name: 'Enimmäisosallistujamäärä',
      });
    case 'startTimeDate':
      return screen.getByLabelText('Ilmoittautuminen alkaa');
    case 'startTimeTime':
      const startTimeGroup = screen.getByRole('group', {
        name: /ilmoittautuminen alkaa klo/i,
      });
      return within(startTimeGroup).getByLabelText('tunnit');
  }
};

test('should render additional info section', async () => {
  renderComponent();

  const headings = [
    translations.event.form.titleAudienceAge,
    translations.event.form.titleEnrolmentTime,
    translations.event.form.titleAttendeeCapacity,
  ];

  headings.forEach((heading) => {
    // Notification has same heading so test that length is 2
    expect(screen.getAllByRole('heading', { name: heading })).toHaveLength(2);
  });

  getElement('minAge');
  getElement('maxAge');
  getElement('minCapacity');
  getElement('maxCapacity');
  getElement('startTimeDate');
  getElement('startTimeTime');
  getElement('endTimeDate');
  getElement('endTimeTime');
});

test('should show validation error if max age is less than min age', async () => {
  const user = userEvent.setup();
  renderComponent({
    [EVENT_FIELDS.AUDIENCE_MAX_AGE]: 5,
    [EVENT_FIELDS.AUDIENCE_MIN_AGE]: 10,
  });

  const minAgeInput = getElement('minAge');
  const maxAgeInput = getElement('maxAge');

  await user.click(maxAgeInput);
  await user.click(minAgeInput);
  await user.tab();

  await screen.findByText('Arvon tulee olla vähintään 10');
});

test('should show validation error if min age is less than 0', async () => {
  const user = userEvent.setup();
  renderComponent({
    [EVENT_FIELDS.AUDIENCE_MIN_AGE]: -1,
  });

  const minAgeInput = getElement('minAge');
  const maxAgeInput = getElement('maxAge');

  await user.click(minAgeInput);
  await user.click(maxAgeInput);

  await screen.findByText('Arvon tulee olla vähintään 0');
});

test('should validate enrolment start and end dates', async () => {
  advanceTo('2020-11-10');
  const user = userEvent.setup();
  renderComponent();

  const startDate = '19.12.2021';
  const startTime = '12:15';
  const endDate = '18.12.2021';
  const endTime = '12:15';

  const startTimeDateInput = getElement('startTimeDate');
  const startTimeTimeInput = getElement('startTimeTime');
  const endTimeDateInput = getElement('endTimeDate');
  const endTimeTimeInput = getElement('endTimeTime');

  await user.type(startTimeDateInput, startDate);
  await user.type(startTimeTimeInput, startTime);

  await user.type(endTimeDateInput, endDate);
  await user.type(endTimeTimeInput, endTime);

  await user.click(startTimeDateInput);

  screen.getByText('Tämän päivämäärän tulee olla 19.12.2021 12.15 jälkeen');
});

test('should show validation error if max capacity is less than min capacity', async () => {
  const user = userEvent.setup();
  renderComponent({
    [EVENT_FIELDS.MAXIMUM_ATTENDEE_CAPACITY]: 5,
    [EVENT_FIELDS.MINIMUM_ATTENDEE_CAPACITY]: 10,
  });

  const minCapacityInput = getElement('minCapacity');
  const maxCapacityInput = getElement('maxCapacity');

  await user.click(maxCapacityInput);
  await user.click(minCapacityInput);
  await user.tab();

  await screen.findByText('Arvon tulee olla vähintään 10');
});

test('should show validation error if min attendee capacity is less than 0', async () => {
  const user = userEvent.setup();
  renderComponent({
    [EVENT_FIELDS.MINIMUM_ATTENDEE_CAPACITY]: -1,
  });

  const minCapacityInput = getElement('minCapacity');
  const maxCapacityInput = getElement('maxCapacity');

  await user.click(maxCapacityInput);
  await user.click(minCapacityInput);

  await screen.findByText('Arvon tulee olla vähintään 0');
});
