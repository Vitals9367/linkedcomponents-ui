import classNames from 'classnames';
import { IconPlus } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import Button from '../../../common/components/button/Button';
import SearchInput from '../../../common/components/searchInput/SearchInput';
import { ROUTES } from '../../../constants';
import { Registration } from '../../../generated/graphql';
import useSearchState from '../../../hooks/useSearchState';
// eslint-disable-next-line max-len
import useRegistrationsQueryStringWithReturnPath from '../../registrations/hooks/useRegistrationsQueryStringWithReturnPath';
import {
  getEnrolmentSearchInitialValues,
  getEnrolmentSearchQuery,
} from '../utils';
import styles from './searchPanel.module.scss';

type Props = {
  registration: Registration;
};

type SearchState = {
  text: string;
};

const SearchPanel: React.FC<Props> = ({ registration }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const [searchState, setSearchState] = useSearchState<SearchState>({
    text: '',
  });

  const queryStringWithReturnPath = useRegistrationsQueryStringWithReturnPath();

  const handleChangeText = (text: string) => {
    setSearchState({ text });
  };

  const handleSearch = () => {
    history.push({
      pathname: location.pathname,
      search: getEnrolmentSearchQuery(searchState),
    });
  };

  const handleCreate = () => {
    history.push({
      pathname: ROUTES.CREATE_ENROLMENT.replace(
        ':registrationId',
        registration.id as string
      ),
      search: queryStringWithReturnPath,
    });
  };

  React.useEffect(() => {
    const { text } = getEnrolmentSearchInitialValues(location.search);
    setSearchState({ text });
  }, [location.search, setSearchState]);

  return (
    <div className={classNames(styles.searchPanel)}>
      <div className={styles.inputRow}>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            className={styles.searchInput}
            clearButtonAriaLabel={t('enrolmentsPage.searchPanel.buttonClear')}
            hideLabel={true}
            label={t('enrolmentsPage.searchPanel.labelSearch')}
            onSearch={handleSearch}
            placeholder={t('enrolmentsPage.searchPanel.placeholderSearch')}
            searchButtonAriaLabel={t('enrolmentsPage.searchPanel.buttonSearch')}
            setValue={handleChangeText}
            value={searchState.text}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.button}
            fullWidth={true}
            onClick={handleSearch}
            variant="primary"
          >
            {t('enrolmentsPage.searchPanel.buttonSearch')}
          </Button>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.button}
            fullWidth={true}
            iconLeft={<IconPlus aria-hidden />}
            onClick={handleCreate}
            variant="secondary"
          >
            {t('enrolmentsPage.searchPanel.buttonCreate')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
