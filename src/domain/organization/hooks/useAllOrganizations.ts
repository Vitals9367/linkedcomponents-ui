import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';

import {
  OrganizationFieldsFragment,
  useOrganizationsQuery,
} from '../../../generated/graphql';
import getNextPage from '../../../utils/getNextPage';
import getPathBuilder from '../../../utils/getPathBuilder';
import getValue from '../../../utils/getValue';
import skipFalsyType from '../../../utils/skipFalsyType';
import { MAX_OGRANIZATIONS_PAGE_SIZE } from '../constants';
import { organizationsPathBuilder } from '../utils';

type UseAllOrganizationsState = {
  loading: boolean;
  organizations: OrganizationFieldsFragment[];
};

const useAllOrganizations = (): UseAllOrganizationsState => {
  const { t } = useTranslation();

  const {
    data: organizationsData,
    fetchMore,
    loading,
  } = useOrganizationsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      createPath: getPathBuilder(organizationsPathBuilder),
      pageSize: MAX_OGRANIZATIONS_PAGE_SIZE,
    },
  });

  const [debouncedLoading] = useDebounce(loading, 100);

  const handleLoadMore = React.useCallback(
    async (page: number) => {
      try {
        await fetchMore({ variables: { page } });
      } catch (e) /* istanbul ignore next */ {
        toast.error(t('common.errorLoadMore'));
      }
    },
    [fetchMore, t]
  );

  React.useEffect(() => {
    const page = organizationsData?.organizations.meta
      ? getNextPage(organizationsData.organizations.meta)
      : null;

    if (page) {
      handleLoadMore(page);
    }
  }, [handleLoadMore, organizationsData]);

  return {
    loading: debouncedLoading,
    organizations: getValue(
      organizationsData?.organizations.data.filter(skipFalsyType),
      []
    ),
  };
};

export default useAllOrganizations;
