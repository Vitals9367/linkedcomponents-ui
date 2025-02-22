export type FeatureFlags = {
  LOCALIZED_IMAGE: boolean;
  SHOW_ADMIN: boolean;
  SHOW_REGISTRATION: boolean;
};

const getFeatureFlags = (): FeatureFlags => ({
  LOCALIZED_IMAGE: process.env.REACT_APP_LOCALIZED_IMAGE === 'true',
  SHOW_ADMIN: process.env.REACT_APP_SHOW_ADMIN === 'true',
  SHOW_REGISTRATION: process.env.REACT_APP_SHOW_REGISTRATION === 'true',
});

const isFeatureEnabled = (feature: keyof FeatureFlags): boolean =>
  getFeatureFlags()[feature];

export const featureFlagUtils = {
  isFeatureEnabled,
  getFeatureFlags,
};
