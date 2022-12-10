import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import Table from '../../../common/components/table/Table2';
import {
  RegistrationFieldsFragment,
  RegistrationsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import useQueryStringWithReturnPath from '../../../hooks/useQueryStringWithReturnPath';
import useTimeFormat from '../../../hooks/useTimeFormat';
import formatDate from '../../../utils/formatDate';
import OrganizationName from '../../organization/organizationName/OrganizationName';
import useRegistrationName from '../../registration/hooks/useRegistrationName';
import useRegistrationPublisher from '../../registration/hooks/useRegistrationPublisher';
import {
  getRegistrationFields,
  getRegistrationItemId,
} from '../../registration/utils';
import RegistrationActionsDropdown from '../registrationActionsDropdown/RegistrationActionsDropdown';
import styles from './registrationsTable.module.scss';

export interface RegistrationsTableProps {
  caption: string;
  className?: string;
  registrations: RegistrationsQuery['registrations']['data'];
}

type ColumnProps = {
  registration: RegistrationFieldsFragment;
};

const NameColumn: FC<ColumnProps> = ({ registration }) => {
  const name = useRegistrationName({ registration });

  return (
    <div className={styles.nameWrapper}>
      <span className={styles.registrationName} title={name}>
        {name}
      </span>
    </div>
  );
};

const PublisherColumn: FC<ColumnProps> = ({ registration }) => {
  const publisher = useRegistrationPublisher({ registration });

  return <OrganizationName id={publisher} />;
};

const EnrolmentsColumn: FC<ColumnProps> = ({ registration }) => {
  const locale = useLocale();
  const { currentAttendeeCount, maximumAttendeeCapacity } =
    getRegistrationFields(registration, locale);

  return (
    <>
      {currentAttendeeCount} / {maximumAttendeeCapacity}
    </>
  );
};

const WaitingListColumn: FC<ColumnProps> = ({ registration }) => {
  const locale = useLocale();
  const { currentWaitingListCount, waitingListCapacity } =
    getRegistrationFields(registration, locale);

  return (
    <>
      {currentWaitingListCount} / {waitingListCapacity}
    </>
  );
};

const StartTimeColumn: FC<ColumnProps> = ({ registration }) => {
  const timeFormat = useTimeFormat();
  const locale = useLocale();
  const { t } = useTranslation();
  const { enrolmentStartTime } = getRegistrationFields(registration, locale);

  return (
    <>
      {enrolmentStartTime
        ? t('eventsPage.datetime', {
            date: formatDate(enrolmentStartTime),
            time: formatDate(enrolmentStartTime, timeFormat, locale),
          })
        : /* istanbul ignore next */ '-'}
    </>
  );
};

const EndTimeColumn: FC<ColumnProps> = ({ registration }) => {
  const timeFormat = useTimeFormat();
  const locale = useLocale();
  const { t } = useTranslation();
  const { enrolmentEndTime } = getRegistrationFields(registration, locale);

  return (
    <>
      {enrolmentEndTime
        ? t('eventsPage.datetime', {
            date: formatDate(enrolmentEndTime),
            time: formatDate(enrolmentEndTime, timeFormat, locale),
          })
        : /* istanbul ignore next */ '-'}
    </>
  );
};

const RegistrationsTable: React.FC<RegistrationsTableProps> = ({
  caption,
  className,
  registrations,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = useLocale();
  const queryStringWithReturnPath = useQueryStringWithReturnPath();

  const handleRowClick = (registration: object) => {
    const { registrationUrl } = getRegistrationFields(
      registration as RegistrationFieldsFragment,
      locale
    );

    navigate({
      pathname: registrationUrl,
      search: queryStringWithReturnPath,
    });
  };

  return (
    <Table
      caption={caption}
      className={className}
      cols={[
        {
          className: styles.nameColumn,
          key: 'name',
          headerName: t('registrationsPage.registrationsTableColumns.name'),
          transform: (registration: RegistrationFieldsFragment) => (
            <NameColumn registration={registration} />
          ),
        },
        {
          className: styles.publisherColumn,
          key: 'publisher',
          headerName: t(
            'registrationsPage.registrationsTableColumns.publisher'
          ),
          transform: (registration: RegistrationFieldsFragment) => (
            <PublisherColumn registration={registration} />
          ),
        },
        {
          className: styles.enrolmentsColumn,
          key: 'enrolments',
          headerName: t(
            'registrationsPage.registrationsTableColumns.enrolments'
          ),
          transform: (registration: RegistrationFieldsFragment) => (
            <EnrolmentsColumn registration={registration} />
          ),
        },
        {
          className: styles.waitingListColumn,
          key: 'waitingList',
          headerName: t(
            'registrationsPage.registrationsTableColumns.waitingList'
          ),
          transform: (registration: RegistrationFieldsFragment) => (
            <WaitingListColumn registration={registration} />
          ),
        },
        {
          className: styles.enrolmentStartTimeColumn,
          key: 'startTime',
          headerName: t(
            'registrationsPage.registrationsTableColumns.enrolmentStartTime'
          ),
          transform: (registration: RegistrationFieldsFragment) => (
            <StartTimeColumn registration={registration} />
          ),
        },
        {
          className: styles.enrolmentEndTimeColumn,
          key: 'endTime',
          headerName: t(
            'registrationsPage.registrationsTableColumns.enrolmentEndTime'
          ),
          transform: (registration: RegistrationFieldsFragment) => (
            <EndTimeColumn registration={registration} />
          ),
        },

        {
          className: styles.actionButtonsColumn,
          key: '',
          headerName: '',
          onClick: (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
          },
          transform: (registration: RegistrationFieldsFragment) => (
            <RegistrationActionsDropdown registration={registration} />
          ),
        },
      ]}
      getRowProps={(registration) => {
        const { id } = getRegistrationFields(
          registration as RegistrationFieldsFragment,
          locale
        );

        return {
          'aria-label': id,
          'data-testid': id,
          id: getRegistrationItemId(id),
        };
      }}
      indexKey="id"
      onRowClick={handleRowClick}
      renderIndexCol={false}
      rows={registrations as RegistrationFieldsFragment[]}
      variant="light"
    />
  );
};

export default RegistrationsTable;
