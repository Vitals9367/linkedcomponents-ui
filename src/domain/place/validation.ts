import * as Yup from 'yup';

import {
  CHARACTER_LIMITS,
  LE_DATA_LANGUAGES,
  ORDERED_LE_DATA_LANGUAGES,
} from '../../constants';
import { Maybe } from '../../types';
import {
  createMultiLanguageValidation,
  createStringMaxErrorMessage,
  isValidPhoneNumber,
  isValidUrl,
  isValidZip,
} from '../../utils/validationUtils';
import { VALIDATION_MESSAGE_KEYS } from '../app/i18n/constants';
import { PLACE_FIELDS } from './constants';

const createMultiLanguageValidationByOrderedLanguages = (
  rule: Yup.StringSchema<Maybe<string>>
) => {
  return createMultiLanguageValidation(ORDERED_LE_DATA_LANGUAGES, rule);
};
export const placeSchema = Yup.object().shape({
  [PLACE_FIELDS.ORIGIN_ID]: Yup.string().when(
    [PLACE_FIELDS.ID],
    ([id], schema) =>
      id ? schema : schema.required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
  ),
  [PLACE_FIELDS.PUBLISHER]: Yup.string()
    .required(VALIDATION_MESSAGE_KEYS.STRING_REQUIRED)
    .nullable(),
  [PLACE_FIELDS.NAME]: createMultiLanguageValidationByOrderedLanguages(
    Yup.string().max(
      CHARACTER_LIMITS.MEDIUM_STRING,
      createStringMaxErrorMessage
    )
  ).concat(
    Yup.object().shape({
      [LE_DATA_LANGUAGES.FI]: Yup.string().required(
        VALIDATION_MESSAGE_KEYS.STRING_REQUIRED
      ),
    })
  ),
  [PLACE_FIELDS.INFO_URL]: createMultiLanguageValidationByOrderedLanguages(
    Yup.string().test('is-url-valid', VALIDATION_MESSAGE_KEYS.URL, (value) =>
      isValidUrl(value)
    )
  ),
  [PLACE_FIELDS.EMAIL]: Yup.string()
    .email(VALIDATION_MESSAGE_KEYS.EMAIL)
    .max(CHARACTER_LIMITS.SHORT_STRING, createStringMaxErrorMessage),
  [PLACE_FIELDS.TELEPHONE]: createMultiLanguageValidationByOrderedLanguages(
    Yup.string().test(
      'isValidPhoneNumber',
      VALIDATION_MESSAGE_KEYS.PHONE,
      (value) => !value || isValidPhoneNumber(value)
    )
  ),
  [PLACE_FIELDS.CONTACT_TYPE]: Yup.string().max(
    CHARACTER_LIMITS.MEDIUM_STRING,
    createStringMaxErrorMessage
  ),
  [PLACE_FIELDS.STREET_ADDRESS]:
    createMultiLanguageValidationByOrderedLanguages(
      Yup.string().max(
        CHARACTER_LIMITS.MEDIUM_STRING,
        createStringMaxErrorMessage
      )
    ),
  [PLACE_FIELDS.ADDRESS_LOCALITY]:
    createMultiLanguageValidationByOrderedLanguages(
      Yup.string().max(
        CHARACTER_LIMITS.MEDIUM_STRING,
        createStringMaxErrorMessage
      )
    ),
  [PLACE_FIELDS.ADDRESS_REGION]: Yup.string().max(
    CHARACTER_LIMITS.MEDIUM_STRING,
    createStringMaxErrorMessage
  ),
  [PLACE_FIELDS.POSTAL_CODE]: Yup.string().test(
    'isValidZip',
    VALIDATION_MESSAGE_KEYS.ZIP,
    (value) => !value || isValidZip(value)
  ),
  [PLACE_FIELDS.POST_OFFICE_BOX_NUM]: Yup.string().max(
    CHARACTER_LIMITS.EXTRA_SHORT_STRING,
    createStringMaxErrorMessage
  ),
});
