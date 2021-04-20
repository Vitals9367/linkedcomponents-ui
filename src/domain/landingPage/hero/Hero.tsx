import classNames from 'classnames';
import { css } from 'emotion';
import { IconPlus, Koros } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import bgImage from '../../../assets/images/webp/landing-page-hero.webp';
import Button from '../../../common/components/button/Button';
import SearchInput from '../../../common/components/searchInput/SearchInput';
import { ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import Container from '../../app/layout/Container';
import FormContainer from '../../app/layout/FormContainer';
import { useTheme } from '../../app/theme/Theme';
import { clearEventFormData } from '../../event/utils';
import { getEventSearchQuery } from '../../eventSearch/utils';
import styles from './hero.module.scss';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const [searchValue, setSearchValue] = React.useState('');

  const goToCreateEventPage = () => {
    clearEventFormData();
    history.push(`/${locale}${ROUTES.CREATE_EVENT}`);
  };

  const handleSearch = (text: string) => {
    history.push({
      pathname: `/${locale}${ROUTES.SEARCH}`,
      search: getEventSearchQuery({ text }),
    });
  };

  return (
    <div className={classNames(styles.hero, css(theme.landingPage))}>
      <section
        className={styles.heroWrapper}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.content}>
          <div>
            <Container>
              <FormContainer className={styles.ctaContainer}>
                <div className={styles.buttonWrapper}>
                  <Button
                    className={styles.ctaButton}
                    fullWidth={true}
                    iconLeft={<IconPlus aria-hidden={true} />}
                    onClick={goToCreateEventPage}
                    variant="primary"
                  >
                    {t('eventSearchPage.searchPanel.buttonCreateNew')}
                  </Button>
                </div>
              </FormContainer>
            </Container>
          </div>
          <div>
            <Container>
              <FormContainer>
                <h1>{t('landingPage.heroTitle')}</h1>

                <div className={styles.searchRow}>
                  <div className={styles.inputWrapper}>
                    <SearchInput
                      className={styles.searchInput}
                      clearButtonAriaLabel={t(
                        'eventSearchPage.searchPanel.buttonClear'
                      )}
                      hideLabel={true}
                      label={t('eventSearchPage.searchPanel.labelSearch')}
                      onSearch={handleSearch}
                      placeholder={t(
                        'eventSearchPage.searchPanel.placeholderSearch'
                      )}
                      searchButtonAriaLabel={t(
                        'eventSearchPage.searchPanel.buttonSearch'
                      )}
                      setValue={setSearchValue}
                      value={searchValue}
                    />
                  </div>
                  <div className={styles.buttonWrapper}>
                    <Button
                      className={styles.searchButton}
                      fullWidth={true}
                      onClick={() => handleSearch(searchValue)}
                      variant="secondary"
                    >
                      {t('eventSearchPage.searchPanel.buttonSearch')}
                    </Button>
                  </div>
                </div>
              </FormContainer>
            </Container>
          </div>
        </div>
      </section>
      <Koros className={styles.koros} type="basic" />
    </div>
  );
};

export default Hero;
