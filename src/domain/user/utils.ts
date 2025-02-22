import {
  UserFieldsFragment,
  UserQueryVariables,
  UsersQueryVariables,
} from '../../generated/graphql';
import { PathBuilderProps } from '../../types';
import getValue from '../../utils/getValue';
import queryBuilder from '../../utils/queryBuilder';
import { UserFields } from './types';

export const userPathBuilder = ({
  args,
}: PathBuilderProps<UserQueryVariables>): string => {
  const { id } = args;

  return `/user/${id}/`;
};

export const usersPathBuilder = ({
  args,
}: PathBuilderProps<UsersQueryVariables>): string => {
  const { page, pageSize } = args;

  const variableToKeyItems = [
    { key: 'page', value: page },
    { key: 'page_size', value: pageSize },
  ];

  const query = queryBuilder(variableToKeyItems);

  return `/user/${query}`;
};

export const getUserFields = (user: UserFieldsFragment): UserFields => ({
  adminOrganizations: user.adminOrganizations,
  displayName: getValue(user.displayName, ''),
  email: getValue(user.email, ''),
  isStaff: user.isStaff || false,
  organizationMemberships: user.organizationMemberships,
  username: getValue(user.username, ''),
});
