import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  EventFieldsFragment,
  PublicationStatus,
} from '../../../generated/graphql';
import getValue from '../../../utils/getValue';
import AuthenticationNotification from '../../app/authenticationNotification/AuthenticationNotification';
import { useAuth } from '../../auth/hooks/useAuth';
import useOrganizationAncestors from '../../organization/hooks/useOrganizationAncestors';
import useUser from '../../user/hooks/useUser';
import { EVENT_ACTIONS } from '../constants';
import { checkIsActionAllowed } from '../utils';

export type EventAuthenticationNotificationProps = {
  event?: EventFieldsFragment | null;
};

const EventAuthenticationNotification: React.FC<
  EventAuthenticationNotificationProps
> = ({ event }) => {
  const { isAuthenticated: authenticated } = useAuth();
  const { user } = useUser();

  const { t } = useTranslation();
  const { organizationAncestors } = useOrganizationAncestors(
    getValue(event?.publisher, '')
  );

  return (
    <AuthenticationNotification
      authorizationWarningLabel={t('event.form.notificationTitleCannotEdit')}
      getAuthorizationWarning={() => {
        if (event) {
          const action =
            event.publicationStatus === PublicationStatus.Draft
              ? EVENT_ACTIONS.UPDATE_DRAFT
              : EVENT_ACTIONS.UPDATE_PUBLIC;

          return checkIsActionAllowed({
            action,
            authenticated,
            event,
            organizationAncestors,
            t,
            user,
          });
        }
        return { warning: '', editable: true };
      }}
      noRequiredOrganizationLabel={t('authentication.noRightsUpdateEventLabel')}
      noRequiredOrganizationText={t('authentication.noRightsUpdateEvent')}
      requiredOrganizationType="any"
    />
  );
};

export default EventAuthenticationNotification;
