import classNames from 'classnames';
import { Linkbox } from 'hds-react';
import capitalize from 'lodash/capitalize';
import React from 'react';
import { useTranslation } from 'react-i18next';

import getValue from '../../../utils/getValue';
import styles from './serviceCard.module.scss';

type ServiceCardProps = {
  backgroundImageUrl: string;
  backgroundColor: 'metro' | 'suomenlinna';
  description?: string;
  href: string;
  imageAuthor?: string;
  title: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const ServiceCard: React.FC<ServiceCardProps> = ({
  backgroundColor,
  backgroundImageUrl,
  description,
  href,
  imageAuthor,
  title,
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={classNames(
        styles.serviceCard,
        styles[`color${capitalize(backgroundColor)}`]
      )}
    >
      <Linkbox
        {...rest}
        external={true}
        heading={title}
        headingAriaLevel={1}
        href={href}
        openInNewTab={true}
        linkAriaLabel={title}
        linkboxAriaLabel={title}
        openInExternalDomainAriaLabel={getValue(
          t('common.openInExternalDomain'),
          undefined
        )}
        openInNewTabAriaLabel={getValue(t('common.openInNewTab'), undefined)}
        size="large"
      >
        <p>{description}</p>
      </Linkbox>
      <div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {imageAuthor && <div className={styles.author}>© {imageAuthor}</div>}
      </div>
    </div>
  );
};

export default ServiceCard;
