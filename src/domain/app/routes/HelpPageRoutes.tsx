import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { ROUTES } from '../../../constants';
import { Language } from '../../../types';
import HelpPageLayout from '../../help/layout/HelpPageLayout';
import ApiPage from '../../help/pages/ApiPage';
import ContactPage from '../../help/pages/ContactPage';
import ControlPanelPage from '../../help/pages/ControlPanelPage';
import DocumentationPage from '../../help/pages/DocumentationPage';
import FaqPage from '../../help/pages/FaqPage';
import FeaturesPage from '../../help/pages/FeaturesPage';
import GeneralInstructionsPage from '../../help/pages/GeneralInstructionsPage';
import GeneralTechnologyPage from '../../help/pages/GeneralTechnologyPage';
import ImageRightsPage from '../../help/pages/ImageRightsPage';
import PlatformPage from '../../help/pages/PlatformPage';
import SourceCodePage from '../../help/pages/SourceCodePage';
import TermsOfUsePage from '../../help/pages/TermsOfUsePage';
import NotFound from '.././../notFound/NotFound';

interface Props {
  locale: Language;
}

const InstructionsRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <Switch>
      <Redirect
        exact
        path={getLocalePath(ROUTES.INSTRUCTIONS)}
        to={getLocalePath(ROUTES.INSTRUCTIONS_GENERAL)}
      />
      <Route
        path={getLocalePath(ROUTES.INSTRUCTIONS_CONTROL_PANEL)}
        component={ControlPanelPage}
      />
      <Route
        path={getLocalePath(ROUTES.INSTRUCTIONS_FAQ)}
        component={FaqPage}
      />
      <Route
        path={getLocalePath(ROUTES.INSTRUCTIONS_GENERAL)}
        component={GeneralInstructionsPage}
      />
      <Route
        path={getLocalePath(ROUTES.INSTRUCTIONS_PLATFORM)}
        component={PlatformPage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

const TechnologyRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <Switch>
      <Redirect
        exact
        path={getLocalePath(ROUTES.TECHNOLOGY)}
        to={getLocalePath(ROUTES.TECHNOLOGY_GENERAL)}
      />
      <Route path={getLocalePath(ROUTES.TECHNOLOGY_API)} component={ApiPage} />
      <Route
        path={getLocalePath(ROUTES.TECHNOLOGY_DOCUMENTATION)}
        component={DocumentationPage}
      />
      <Route
        path={getLocalePath(ROUTES.TECHNOLOGY_GENERAL)}
        component={GeneralTechnologyPage}
      />
      <Route
        path={getLocalePath(ROUTES.TECHNOLOGY_IMAGE_RIGHTS)}
        component={ImageRightsPage}
      />
      <Route
        path={getLocalePath(ROUTES.TECHNOLOGY_SOURCE_CODE)}
        component={SourceCodePage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

const SupportRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <Switch>
      <Redirect
        exact
        path={getLocalePath(ROUTES.SUPPORT)}
        to={getLocalePath(ROUTES.SUPPORT_TERMS_OF_USE)}
      />
      <Route
        path={getLocalePath(ROUTES.SUPPORT_CONTACT)}
        component={ContactPage}
      />
      <Route
        path={getLocalePath(ROUTES.SUPPORT_TERMS_OF_USE)}
        component={TermsOfUsePage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

const HelpPageRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <HelpPageLayout>
      <Switch>
        <Redirect
          exact
          path={getLocalePath(ROUTES.HELP)}
          to={getLocalePath(ROUTES.INSTRUCTIONS)}
        />
        <Route path={getLocalePath(ROUTES.INSTRUCTIONS)}>
          <InstructionsRoutes locale={locale} />
        </Route>
        <Route path={getLocalePath(ROUTES.TECHNOLOGY)}>
          <TechnologyRoutes locale={locale} />
        </Route>
        <Route path={getLocalePath(ROUTES.SUPPORT)}>
          <SupportRoutes locale={locale} />
        </Route>
        <Route path={getLocalePath(ROUTES.FEATURES)} component={FeaturesPage} />
        <Route component={NotFound} />
      </Switch>
    </HelpPageLayout>
  );
};

export default HelpPageRoutes;
