import orderBy from 'lodash/orderBy';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import LoadingSpinner from '../../../../common/components/loadingSpinner/LoadingSpinner';
import Table from '../../../../common/components/table/Table';
import TableWrapper from '../../../../common/components/table/tableWrapper/TableWrapper';
import { OrganizationFieldsFragment } from '../../../../generated/graphql';
import useLocale from '../../../../hooks/useLocale';
import formatDate from '../../../../utils/formatDate';
import getSortByOrderAndColKey from '../../../../utils/getSortByOrderAndColKey';
import getSortOrderAndKey from '../../../../utils/getSortOrderAndKey';
import getValue from '../../../../utils/getValue';
import useOrganizationSortOptions from '../../../organizations/hooks/useOrganizationSortOptions';
import {
  addParamsToOrganizationQueryString,
  getOrganizationItemId,
} from '../../../organizations/utils';
import { ORGANIZATION_FIELDS } from '../../constants';
import useAllOrganizations from '../../hooks/useAllOrganizations';
import { getOrganizationFields } from '../../utils';
import styles from './subOrganizationTable.module.scss';

const NameColumn = (organization: OrganizationFieldsFragment) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { fullName } = getOrganizationFields(organization, locale, t);

  return <>{fullName}</>;
};

const FoundingDateColumn = (organization: OrganizationFieldsFragment) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { foundingDate } = getOrganizationFields(organization, locale, t);

  return (
    <>
      {foundingDate ? formatDate(foundingDate) : /* istanbul ignore next */ '-'}
    </>
  );
};

const ClassificationColumn = (organization: OrganizationFieldsFragment) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { classification } = getOrganizationFields(organization, locale, t);

  return <>{getValue(classification, '-')}</>;
};

const DataSourceColumn = (organization: OrganizationFieldsFragment) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { dataSource } = getOrganizationFields(organization, locale, t);

  return <>{getValue(dataSource, '-')}</>;
};

const OriginIdColumn = (organization: OrganizationFieldsFragment) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const { originId } = getOrganizationFields(organization, locale, t);

  return <>{getValue(originId, '-')}</>;
};

export type SubOrganizationTableProps = {
  organizationIds: string[];
  title: string;
};

const SubOrganizationTable: React.FC<SubOrganizationTableProps> = ({
  organizationIds,
  title,
}) => {
  const locale = useLocale();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const sortOptions = useOrganizationSortOptions();
  const [sort, setSort] = React.useState<string>(ORGANIZATION_FIELDS.NAME);
  const { loading, organizations: allOrganizations } = useAllOrganizations();
  const organizations = allOrganizations.filter((o) =>
    organizationIds.includes(o.atId)
  );
  const sortedOrganizations = orderBy(
    organizations,
    [sort.replace(/-/g, '')],
    [sort.startsWith('-') ? 'desc' : 'asc']
  );

  const getTableCaption = () => {
    return t(`organization.subOrganizationsTableCaption`, {
      title,
      sort: sortOptions.find((option) => option.value === sort)?.label,
    });
  };

  const goToEditOrganizationPage = (
    organizaion: OrganizationFieldsFragment
  ) => {
    const { organizationUrl } = getOrganizationFields(organizaion, locale, t);
    const queryString = addParamsToOrganizationQueryString(search, {
      returnPath: pathname,
    });

    navigate({
      pathname: organizationUrl,
      search: queryString,
    });
  };

  const handleRowClick = (organizaion: object) => {
    goToEditOrganizationPage(organizaion as OrganizationFieldsFragment);
  };

  const { initialSortingColumnKey, initialSortingOrder } = useMemo(() => {
    const { colKey, order } = getSortOrderAndKey(sort);

    return {
      initialSortingColumnKey: colKey,
      initialSortingOrder: order,
    };
  }, [sort]);

  return (
    <div className={styles.subOrganizationTable}>
      <h2 className={styles.title}>{title}</h2>
      <TableWrapper>
        <Table
          caption={getTableCaption()}
          cols={[
            {
              className: styles.nameColumn,
              isSortable: true,
              key: ORGANIZATION_FIELDS.NAME,
              headerName: t('organization.form.labelName'),
              sortIconType: 'string',
              transform: NameColumn,
            },
            {
              className: styles.foundingDateColumn,
              isSortable: true,
              key: ORGANIZATION_FIELDS.FOUNDING_DATE,
              headerName: t('organization.form.labelFoundingDate'),
              sortIconType: 'other',
              transform: FoundingDateColumn,
            },
            {
              className: styles.classificationColumn,
              isSortable: true,
              key: ORGANIZATION_FIELDS.CLASSIFICATION,
              headerName: t('organization.form.labelClassification'),
              sortIconType: 'string',
              transform: ClassificationColumn,
            },
            {
              className: styles.dataSourceColumn,
              isSortable: true,
              key: ORGANIZATION_FIELDS.DATA_SOURCE,
              headerName: t('organization.form.labelDataSource'),
              sortIconType: 'string',
              transform: DataSourceColumn,
            },
            {
              className: styles.originIdColumn,
              isSortable: true,
              key: ORGANIZATION_FIELDS.ID,
              headerName: t('organization.form.labelOriginId'),
              sortIconType: 'string',
              transform: OriginIdColumn,
            },
          ]}
          getRowProps={(organization) => {
            const { id, name } = getOrganizationFields(
              organization as OrganizationFieldsFragment,
              locale,
              t
            );

            return {
              'aria-label': name,
              'data-testid': id,
              id: getOrganizationItemId(id),
            };
          }}
          indexKey="id"
          initialSortingColumnKey={initialSortingColumnKey}
          initialSortingOrder={initialSortingOrder}
          onRowClick={handleRowClick}
          onSort={(order, colKey, handleSort) => {
            setSort(getSortByOrderAndColKey({ order, colKey }));
            handleSort();
          }}
          rows={sortedOrganizations as OrganizationFieldsFragment[]}
          showNoResultsRow={!loading}
          variant="light"
        />
        {loading && <LoadingSpinner small isLoading={true} />}
      </TableWrapper>
    </div>
  );
};

export default SubOrganizationTable;
