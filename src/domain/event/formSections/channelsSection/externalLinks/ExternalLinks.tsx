import { FieldArray, useField } from 'formik';
import React from 'react';

import FormGroup from '../../../../../common/components/formGroup/FormGroup';
import { EVENT_FIELDS, EXTERNAL_LINK_FIELDS } from '../../../constants';
import { ExternalLink as ExternalLinkType } from '../../../types';
import ExternalLink from './ExternalLink';
import NewExternalLink from './NewExternalLink';

interface Props {
  isEditingAllowed: boolean;
}

const ExternalLinks: React.FC<Props> = ({ isEditingAllowed }) => {
  const [{ value: externalLinks }] = useField<ExternalLinkType[]>({
    name: EVENT_FIELDS.EXTERNAL_LINKS,
  });
  const [{ value: type }] = useField({ name: EVENT_FIELDS.TYPE });

  return (
    <FieldArray
      name={EVENT_FIELDS.EXTERNAL_LINKS}
      render={(arrayHelpers) => (
        <div>
          {externalLinks.map((externalLink, index) => {
            return (
              <FormGroup key={index}>
                <ExternalLink
                  externalLink={externalLink}
                  index={index}
                  isEditingAllowed={isEditingAllowed}
                  onDelete={() => arrayHelpers.remove(index)}
                  type={type}
                />
              </FormGroup>
            );
          })}

          <NewExternalLink
            isEditingAllowed={isEditingAllowed}
            onChange={(item) =>
              arrayHelpers.push({
                [EXTERNAL_LINK_FIELDS.NAME]: item.value,
                [EXTERNAL_LINK_FIELDS.LINK]: '',
              })
            }
            type={type}
          />
        </div>
      )}
    />
  );
};

export default ExternalLinks;
