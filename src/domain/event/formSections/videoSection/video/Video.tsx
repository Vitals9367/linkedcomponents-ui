import { FastField, useField } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DeleteButton from '../../../../../common/components/deleteButton/DeleteButton';
import TextInputField from '../../../../../common/components/formFields/textInputField/TextInputField';
import FormGroup from '../../../../../common/components/formGroup/FormGroup';
import Notification from '../../../../../common/components/notification/Notification';
import FieldRow from '../../../../app/layout/fieldRow/FieldRow';
import { VIDEO_DETAILS_FIELDS } from '../../../constants';
import styles from '../../../eventPage.module.scss';
import FieldWithButton from '../../../layout/FieldWithButton';

type Props = {
  canDelete: boolean;
  isEditingAllowed: boolean;
  onDelete: () => void;
  showInstructions?: boolean;
  type: string;
  videoPath: string;
};

const getFieldName = (videoPath: string, field: string) =>
  `${videoPath}.${field}`;

const Video: React.FC<Props> = ({
  canDelete,
  isEditingAllowed,
  onDelete,
  showInstructions,
  type,
  videoPath,
}) => {
  const { t } = useTranslation();

  const fieldNames = React.useMemo(
    () => ({
      altText: getFieldName(videoPath, VIDEO_DETAILS_FIELDS.ALT_TEXT),
      name: getFieldName(videoPath, VIDEO_DETAILS_FIELDS.NAME),
      url: getFieldName(videoPath, VIDEO_DETAILS_FIELDS.URL),
    }),
    [videoPath]
  );

  const [{ value: altText }] = useField({
    name: fieldNames.altText,
  });
  const [{ value: name }] = useField({
    name: fieldNames.name,
  });
  const [{ value: url }] = useField({
    name: fieldNames.url,
  });

  const isRequired = React.useMemo(
    () => Boolean(name || url || altText),
    [altText, name, url]
  );

  return (
    <>
      <h3>{t(`event.form.titleVideo.${type}`)}</h3>
      <FieldRow
        notification={
          showInstructions ? (
            <Notification
              className={styles.notificationForTitle}
              label={t(`event.form.notificationTitleVideo.${type}`)}
              type="info"
            >
              <p>{t(`event.form.infoTextVideo1.${type}`)}</p>
              <p>{t(`event.form.infoTextVideo2`)}</p>
            </Notification>
          ) : undefined
        }
      >
        <FieldWithButton
          button={
            canDelete && (
              <DeleteButton
                ariaLabel={t('event.form.buttonDeleteVideo')}
                disabled={!isEditingAllowed}
                onClick={onDelete}
              />
            )
          }
        >
          <>
            <FormGroup>
              <FastField
                component={TextInputField}
                disabled={!isEditingAllowed}
                label={t(`event.form.labelVideoUrl`)}
                name={fieldNames.url}
                placeholder={t(`event.form.placeholderVideoUrl`)}
                required={isRequired}
              />
            </FormGroup>
            <FormGroup>
              <FastField
                component={TextInputField}
                disabled={!isEditingAllowed}
                label={t(`event.form.labelVideoName`)}
                name={fieldNames.name}
                placeholder={t(`event.form.placeholderVideoName`)}
                required={isRequired}
              />
            </FormGroup>
            <FastField
              component={TextInputField}
              disabled={!isEditingAllowed}
              label={t(`event.form.labelVideoAltText`)}
              name={fieldNames.altText}
              placeholder={t(`event.form.placeholderVideoAltText`)}
              required={isRequired}
            />
          </>
        </FieldWithButton>
      </FieldRow>
    </>
  );
};

export default Video;
