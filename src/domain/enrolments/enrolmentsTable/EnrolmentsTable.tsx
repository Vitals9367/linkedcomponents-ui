import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import NoDataRow from '../../../common/components/table/NoDataRow';
import Table from '../../../common/components/table/Table';
import { Enrolment, Registration } from '../../../generated/graphql';
import useIsComponentFocused from '../../../hooks/useIsComponentFocused';
import useLocale from '../../../hooks/useLocale';
import { addParamsToEnrolmentQueryString, getEnrolmentFields } from '../utils';
import styles from './enrolmentsTable.module.scss';
import EnrolmentTableRow from './EnrolmentTableRow';

export interface EnrolmentsTableProps {
  caption: string;
  className?: string;
  enrolments: Enrolment[];
  heading: string;
  registration: Registration;
}

const EnrolmentsTable: React.FC<EnrolmentsTableProps> = ({
  caption,
  className,
  enrolments,
  heading,
  registration,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const locale = useLocale();

  const table = React.useRef<HTMLTableElement>(null);
  const [focused, setFocused] = React.useState(false);

  const isComponentFocused = useIsComponentFocused(table);

  const onDocumentFocusin = () => {
    const isFocused = isComponentFocused();
    if (isFocused !== focused) {
      setFocused(isFocused);
    }
  };

  React.useEffect(() => {
    document.addEventListener('focusin', onDocumentFocusin);

    return () => {
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  });

  const handleRowClick = (enrolment: Enrolment) => {
    const { enrolmentUrl } = getEnrolmentFields({
      enrolment,
      language: locale,
      registration,
    });
    const queryString = addParamsToEnrolmentQueryString(location.search, {
      returnPath: location.pathname,
    });
    history.push({ pathname: enrolmentUrl, search: queryString });
  };

  return (
    <>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={className}>
        <Table ref={table} className={classNames(styles.enrolmentsTable)}>
          <caption aria-live={focused ? 'polite' : undefined}>
            {caption}
          </caption>
          <thead>
            <tr>
              <th className={styles.nameColumn}>
                {t('enrolmentsPage.enrolmentsTableColumns.name')}
              </th>
              <th className={styles.genderColumn}>
                {t('enrolmentsPage.enrolmentsTableColumns.gender')}
              </th>
              <th className={styles.emailColumn}>
                {t('enrolmentsPage.enrolmentsTableColumns.email')}
              </th>
              <th className={styles.phoneColumn}>
                {t('enrolmentsPage.enrolmentsTableColumns.phone')}
              </th>
              <th className={styles.statusColumn}>
                {t('enrolmentsPage.enrolmentsTableColumns.status')}
              </th>
              <th className={styles.actionButtonsColumn}></th>
            </tr>
          </thead>
          <tbody>
            {enrolments.map(
              (enrolment) =>
                enrolment && (
                  <EnrolmentTableRow
                    enrolment={enrolment}
                    onRowClick={handleRowClick}
                    registration={registration}
                  />
                )
            )}
            {!enrolments.length && <NoDataRow colSpan={6} />}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default EnrolmentsTable;
