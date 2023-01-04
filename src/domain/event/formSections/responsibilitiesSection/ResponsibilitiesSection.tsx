/* eslint-disable max-len */
import { Field, useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Fieldset from '../../../../common/components/fieldset/Fieldset';
import MultiLanguageField from '../../../../common/components/formFields/multiLanguageField/MultiLanguageField';
import PublisherSelectorField from '../../../../common/components/formFields/publisherSelectorField/PublisherSelectorField';
import Notification from '../../../../common/components/notification/Notification';
import { EventFieldsFragment } from '../../../../generated/graphql';
import FieldColumn from '../../../app/layout/fieldColumn/FieldColumn';
import FieldRow from '../../../app/layout/fieldRow/FieldRow';
import useUser from '../../../user/hooks/useUser';
import useUserOrganizations from '../../../user/hooks/useUserOrganizations';
import { EVENT_FIELDS } from '../../constants';

export interface ResponsibilitiesSectionProps {
  isEditingAllowed: boolean;
  savedEvent?: EventFieldsFragment;
}

const ResponsibilitiesSection: React.FC<ResponsibilitiesSectionProps> = ({
  isEditingAllowed,
  savedEvent,
}) => {
  const { user } = useUser();
  const { organizations: userOrganizations } = useUserOrganizations(user);
  const { t } = useTranslation();

  const [{ value: type }] = useField({ name: EVENT_FIELDS.TYPE });
  const [{ value: eventInfoLanguages }] = useField({
    name: EVENT_FIELDS.EVENT_INFO_LANGUAGES,
  });
  const [{ value: publisher }, , { setValue: setPublisher }] = useField({
    name: EVENT_FIELDS.PUBLISHER,
  });

  const getDisabled = (name: EVENT_FIELDS.PUBLISHER): boolean => {
    const savedPublisher = savedEvent?.publisher;

    switch (name) {
      case EVENT_FIELDS.PUBLISHER:
        return (
          !userOrganizations.length ||
          Boolean(savedPublisher) ||
          (publisher && userOrganizations.length === 1)
        );
    }
  };

  React.useEffect(() => {
    if (!savedEvent && user && publisher) {
      // Set default publisher after user logs in if publisher is not set
      /* istanbul ignore next */
      setPublisher(user.organization ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fieldset heading={t('event.form.sections.responsibilities')} hideLegend>
      <FieldRow
        notification={
          <Notification
            label={t(`event.form.notificationTitlePublisher.${type}`)}
            type="info"
          >
            <p>{t(`event.form.infoTextPublisher.${type}`)}</p>
          </Notification>
        }
      >
        <FieldColumn>
          <Field
            component={PublisherSelectorField}
            disabled={!isEditingAllowed || getDisabled(EVENT_FIELDS.PUBLISHER)}
            label={t(`event.form.labelPublisher.${type}`)}
            name={EVENT_FIELDS.PUBLISHER}
            publisher={savedEvent?.publisher}
          />
        </FieldColumn>
      </FieldRow>

      <FieldRow
        notification={
          <Notification
            label={t(`event.form.notificationTitleProvider.${type}`)}
            type="info"
          >
            <p>{t(`event.form.infoTextProvider.${type}`)}</p>
          </Notification>
        }
      >
        <FieldColumn>
          <MultiLanguageField
            disabled={!isEditingAllowed}
            labelKey={`event.form.labelProvider.${type}`}
            languages={eventInfoLanguages}
            name={EVENT_FIELDS.PROVIDER}
            placeholder={t(`event.form.placeholderProvider.${type}`) as string}
          />
        </FieldColumn>
      </FieldRow>
    </Fieldset>
  );
};

export default ResponsibilitiesSection;
