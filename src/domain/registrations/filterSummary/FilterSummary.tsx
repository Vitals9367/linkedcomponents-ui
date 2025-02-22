import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import EventTypeFilterTag from '../../../common/components/filterTag/evenTypeFilterTag/EventTypeFilterTag';
import FilterTag from '../../../common/components/filterTag/FilterTag';
import { FilterType } from '../../../types';
import {
  getRegistrationSearchInitialValues,
  replaceParamsToRegistrationQueryString,
} from '../utils';
import styles from './filterSummary.module.scss';

interface Props {
  className?: string;
}

const FilterSummary: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { eventType, text } = getRegistrationSearchInitialValues(search);

  const clearFilters = () => {
    navigate({
      pathname,
      search: replaceParamsToRegistrationQueryString(search, {
        eventType: [],
        text: '',
      }),
    });
  };

  const removeFilter = ({
    value,
    type,
  }: {
    value: string;
    type: FilterType;
  }) => {
    const newSearch = replaceParamsToRegistrationQueryString(search, {
      eventType:
        type === 'eventType'
          ? eventType.filter((item) => item !== value)
          : eventType,
      text: type === 'text' ? '' : text,
    });

    navigate({ pathname, search: newSearch });
  };

  const hasFilters = Boolean(eventType.length || text);

  if (!hasFilters) return null;

  return (
    <div className={classNames(styles.filterSummary, className)}>
      {text && (
        <FilterTag
          text={text}
          onDelete={removeFilter}
          type="text"
          value={text}
        />
      )}
      {eventType.map((type) => {
        return (
          <EventTypeFilterTag key={type} onDelete={removeFilter} value={type} />
        );
      })}

      <button
        className={styles.clearButton}
        onClick={clearFilters}
        type="button"
      >
        {t('registrationsPage.buttonClearFilters')}
      </button>
    </div>
  );
};

export default FilterSummary;
