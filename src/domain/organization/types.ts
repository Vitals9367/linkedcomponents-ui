import { ORGANIZATION_FIELDS } from './constants';

export type OrganizationFields = {
  affiliatedOrganizations: string[];
  atId: string;
  classification: string;
  dataSource: string;
  foundingDate: Date | null;
  fullName: string;
  id: string;
  name: string;
  organizationUrl: string;
  originId: string;
  parentOrganization: string | null;
  subOrganizations: string[];
};

export type OrganizationFormFields = {
  [ORGANIZATION_FIELDS.ADMIN_USERS]: string[];
  [ORGANIZATION_FIELDS.AFFILIATED_ORGANIZATIONS]: string[];
  [ORGANIZATION_FIELDS.CLASSIFICATION]: string;
  [ORGANIZATION_FIELDS.DATA_SOURCE]: string;
  [ORGANIZATION_FIELDS.DISSOLUTION_DATE]: Date | null;
  [ORGANIZATION_FIELDS.FOUNDING_DATE]: Date | null;
  [ORGANIZATION_FIELDS.ID]: string;
  [ORGANIZATION_FIELDS.INTERNAL_TYPE]: string;
  [ORGANIZATION_FIELDS.NAME]: string;
  [ORGANIZATION_FIELDS.ORIGIN_ID]: string;
  [ORGANIZATION_FIELDS.PARENT_ORGANIZATION]: string;
  [ORGANIZATION_FIELDS.REGULAR_USERS]: string[];
  [ORGANIZATION_FIELDS.REPLACED_BY]: string;
  [ORGANIZATION_FIELDS.SUB_ORGANIZATIONS]: string[];
};
