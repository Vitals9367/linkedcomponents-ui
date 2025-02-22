import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import Table from '../../../common/components/table/Table';
import {
  KeywordSetFieldsFragment,
  KeywordSetsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import useQueryStringWithReturnPath from '../../../hooks/useQueryStringWithReturnPath';
import getSortByOrderAndColKey from '../../../utils/getSortByOrderAndColKey';
import getSortOrderAndKey from '../../../utils/getSortOrderAndKey';
import getValue from '../../../utils/getValue';
import {
  getKeywordSetFields,
  getKeywordSetItemId,
} from '../../keywordSet/utils';
import { KEYWORD_SET_SORT_OPTIONS } from '../constants';
import useKeywordSetUsageOptions from '../hooks/useKeywordSetUsageOptions';
import KeywordSetActionsDropdown from '../keywordSetActionsDropdown/KeywordSetActionsDropdown';
import styles from './keywordSetsTable.module.scss';

export interface KeywordSetsTableProps {
  caption: string;
  className?: string;
  keywordSets: KeywordSetsQuery['keywordSets']['data'];
  setSort: (sort: KEYWORD_SET_SORT_OPTIONS) => void;
  sort: KEYWORD_SET_SORT_OPTIONS;
}

const IdColumn = (keywordSet: KeywordSetFieldsFragment) => {
  const locale = useLocale();
  const { keywordSetUrl, id } = getKeywordSetFields(keywordSet, locale);

  return (
    <Link
      onClick={/* istanbul ignore next */ (e) => e.preventDefault()}
      to={keywordSetUrl}
    >
      {id}
    </Link>
  );
};

const NameColumn = (keywordSet: KeywordSetFieldsFragment) => {
  const locale = useLocale();
  const { name } = getKeywordSetFields(keywordSet, locale);

  return <>{name}</>;
};

const UsageColumn = (keywordSet: KeywordSetFieldsFragment) => {
  const locale = useLocale();
  const { usage } = getKeywordSetFields(keywordSet, locale);

  const usageOptions = useKeywordSetUsageOptions();

  const getUsageText = (usage: string) => {
    return getValue(
      usageOptions.find((option) => option.value === usage)?.label,
      usage
    );
  };

  return <>{getUsageText(usage)}</>;
};

const ActionsColumn = (keywordSet: KeywordSetFieldsFragment) => {
  return <KeywordSetActionsDropdown keywordSet={keywordSet} />;
};

const KeywordSetsTable: React.FC<KeywordSetsTableProps> = ({
  caption,
  className,
  keywordSets,
  setSort,
  sort,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locale = useLocale();
  const queryStringWithReturnPath = useQueryStringWithReturnPath();

  const handleRowClick = (keywordSet: object) => {
    const { keywordSetUrl } = getKeywordSetFields(
      keywordSet as KeywordSetFieldsFragment,
      locale
    );

    navigate({
      pathname: keywordSetUrl,
      search: queryStringWithReturnPath,
    });
  };

  const handleSortChange = (key: string) => {
    setSort(key as KEYWORD_SET_SORT_OPTIONS);
  };

  const { initialSortingColumnKey, initialSortingOrder } = useMemo(() => {
    const { colKey, order } = getSortOrderAndKey(sort);

    return {
      initialSortingColumnKey: colKey,
      initialSortingOrder: order,
    };
  }, [sort]);

  return (
    <Table
      caption={caption}
      className={className}
      cols={[
        {
          className: styles.idColumn,
          isSortable: true,
          key: KEYWORD_SET_SORT_OPTIONS.ID,
          headerName: t('keywordSetsPage.keywordSetsTableColumns.id'),
          sortIconType: 'string',
          transform: IdColumn,
        },
        {
          className: styles.nameColumn,
          isSortable: true,
          key: KEYWORD_SET_SORT_OPTIONS.NAME,
          headerName: t('keywordSetsPage.keywordSetsTableColumns.name'),
          sortIconType: 'string',
          transform: NameColumn,
        },
        {
          className: styles.usageColumn,
          isSortable: true,
          key: KEYWORD_SET_SORT_OPTIONS.USAGE,
          headerName: t('keywordSetsPage.keywordSetsTableColumns.usage'),
          sortIconType: 'string',
          transform: UsageColumn,
        },
        {
          className: styles.actionButtonsColumn,
          key: 'actionButtons',
          headerName: '',
          onClick: (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
          },
          transform: ActionsColumn,
        },
      ]}
      getRowProps={(keywordSet) => {
        const { id, name } = getKeywordSetFields(
          keywordSet as KeywordSetFieldsFragment,
          locale
        );

        return {
          'aria-label': name,
          'data-testid': id,
          id: getKeywordSetItemId(id),
        };
      }}
      indexKey="id"
      initialSortingColumnKey={initialSortingColumnKey}
      initialSortingOrder={initialSortingOrder}
      onRowClick={handleRowClick}
      onSort={(order, colKey, handleSort) => {
        handleSortChange(getSortByOrderAndColKey({ order, colKey }));
        handleSort();
      }}
      rows={keywordSets as KeywordSetFieldsFragment[]}
      variant="light"
    />
  );
};

export default KeywordSetsTable;
