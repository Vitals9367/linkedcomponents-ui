import { Tag } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { FilterType } from '../../../types';

export interface FilterTagProps {
  onDelete: (options: { type: FilterType; value: string }) => void;
  text: string;
  type: FilterType;
  value: string;
}

const FilterTag: React.FC<FilterTagProps> = ({
  onDelete,
  text,
  type,
  value,
}) => {
  const { t } = useTranslation();
  const deleteFilter = () => {
    onDelete({ type, value });
  };

  return (
    <Tag
      deleteButtonAriaLabel={
        t('common.buttonRemoveFilter', { name: text }) as string
      }
      onDelete={deleteFilter}
    >
      {text}
    </Tag>
  );
};

export default FilterTag;
