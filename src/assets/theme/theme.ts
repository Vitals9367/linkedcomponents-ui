import { Theme } from '../../domain/app/theme/Theme';

const commonButtonVariables = {
  '--focus-outline-color': 'var(--color-coat-of-arms)',
  '--submit-input-focus-gutter-color': 'var(--color-white)',
};

const secondaryAndSumplementaryButtonVariables = {
  '--background-color': 'transparent',
  '--background-color-hover': 'var(--color-bus-light)',
  '--background-color-focus': 'transparent',
  '--background-color-hover-focus': 'var(--color-bus-light)',
  '--background-color-disabled': 'transparent',
  '--color': 'var(--color-bus)',
  '--color-hover': 'var(--color-bus-dark)',
  '--color-focus': 'var(--color-bus)',
  '--color-hover-focus': 'var(--color-bus-dark)',
  '--color-disabled': 'var(--color-black-40)',
};

const dangerAndSuccessButtonVariables = {
  '--color': 'var(--color-white)',
  '--color-hover': 'var(--color-white)',
  '--color-focus': 'var(--color-white)',
  '--color-hover-focus': 'var(--color-white)',
  '--focus-outline-color': 'var(--color-coat-of-arms)',
};

const commonNotificationVariables = {
  '--notification-border-width': 'var(--spacing-2-xs)',
  '--notification-color': 'var(--color-black-90)',
  '--notification-focus-outline-color': 'var(--color-coat-of-arms)',
  '--notification-max-width-inline': 'none',
  '--notification-max-width-toast': '21rem',
  '--notification-offset': 'var(--spacing-layout-s)',
  '--notification-z-index': 99,
};

const theme: Theme = {
  breadcrumb: {
    '--breadcrumb-color': 'var(--color-black-90)',
    '--breadcrumb-color-link': 'var(--color-black-90)',
    '--breadcrumb-color-separator': 'var(--color-black)',
  },
  button: {
    primary: {
      ...commonButtonVariables,
      '--background-color': 'var(--color-bus)',
      '--background-color-hover': 'var(--color-bus-dark)',
      '--background-color-focus': 'var(--color-bus)',
      '--background-color-hover-focus': 'var(--color-bus-dark)',
      '--background-color-disabled': 'var(--color-black-20)',
      '--border-color': 'var(--color-bus)',
      '--border-color-hover': 'var(--color-bus-dark)',
      '--border-color-focus': 'var(--color-bus)',
      '--border-color-hover-focus': 'var(--color-bus-dark)',
      '--border-color-disabled': 'var(--color-black-20)',
      '--color': 'var(--color-white)',
      '--color-hover': 'var(--color-white)',
      '--color-focus': 'var(--color-white)',
      '--color-hover-focus': 'var(--color-white)',
      '--color-disabled': 'var(--color-white)',
    },
    secondary: {
      ...commonButtonVariables,
      ...secondaryAndSumplementaryButtonVariables,
      '--background-color-hover': 'var(--color-black-10)',
      '--background-color-focus': 'transparent',
      '--background-color-hover-focus': 'var(--color-black-10)',
      '--border-color': 'var(--color-black-70)',
      '--border-color-hover': 'var(--color-black-70)',
      '--border-color-focus': 'var(--color-black-70)',
      '--border-color-hover-focus': 'var(--color-black-70)',
      '--border-color-disabled': 'var(--color-black-50)',
      '--color': 'var(--color-black-70)',
      '--color-hover': 'var(--color-black-70)',
      '--color-focus': 'var(--color-black-70)',
      '--color-hover-focus': 'var(--color-black-70)',
    },
    supplementary: {
      ...commonButtonVariables,
      ...secondaryAndSumplementaryButtonVariables,
      '--border-color': 'transparent',
      '--border-color-hover': 'transparent',
      '--border-color-focus': 'var(--color-coat-of-arms)',
      '--border-color-hover-focus': 'var(--color-coat-of-arms)',
      '--border-color-disabled': 'transparent',
      '--focus-outline-color': 'transparent',
      '--submit-input-focus-gutter-color': 'transparent',
    },
    success: {
      ...commonButtonVariables,
      ...dangerAndSuccessButtonVariables,
      '--background-color': 'var(--color-success)',
      '--background-color-hover': 'var(--color-success-dark)',
      '--background-color-focus': 'var(--color-success)',
      '--background-color-hover-focus': 'var(--color-success-dark)',
      '--border-color': 'var(--color-success)',
      '--border-color-hover': 'var(--color-success-dark)',
      '--border-color-focus': 'var(--color-success)',
      '--border-color-hover-focus': 'var(--color-success-dark)',
    },
    danger: {
      ...commonButtonVariables,
      ...dangerAndSuccessButtonVariables,
      '--background-color': 'var(--color-error)',
      '--background-color-hover': 'var(--color-error-dark)',
      '--background-color-focus': 'var(--color-error)',
      '--background-color-hover-focus': 'var(--color-error-dark)',
      '--border-color': 'var(--color-error)',
      '--border-color-hover': 'var(--color-error-dark)',
      '--border-color-focus': 'var(--color-error)',
      '--border-color-hover-focus': 'var(--color-error-dark)',
    },
  },
  checkbox: {
    '--background-unselected': 'transparent',
    '--background-selected': 'var(--color-bus)',
    '--background-hover': 'var(--color-bus-dark)',
    '--background-disabled': 'var(--color-black-10)',
    '--border-color-selected': 'var(--color-bus)',
    '--border-color-selected-hover': 'var(--color-bus-dark)',
    '--border-color-selected-focus': 'var(--color-bus)',
    '--border-color-unselected': 'var(--color-black-50)',
    '--border-color-unselected-hover': 'var(--color-black-90)',
    '--border-color-unselected-focus': 'var(--color-black-90)',
    '--border-color-disabled': 'var(--color-black-10)',
    '--icon-color-unselected': 'transparent',
    '--icon-color-selected': 'var(--color-white)',
    '--icon-color-disabled': 'var(--color-white)',
    '--focus-outline-color': 'var(--color-coat-of-arms)',
    '--label-color': 'var(--color-black-90)',
    '--label-color-disabled': 'var(--color-black-40)',
  },
  collapsible: {
    '--heading-background-color': 'var(--color-bus)',
    '--heading-background-color-hover': 'var(--color-bus-dark)',
    '--heading-background-color-expanded': 'var(--color-bus)',
    '--heading-background-color-expanded-hover': 'var(--color-bus-dark)',
    '--heading-border-color': 'var(--color-bus)',
    '--heading-border-color-hover': 'var(--color-bus-dark)',
    '--heading-border-color-expanded': 'var(--color-bus)',
    '--heading-border-color-expanded-hover': 'var(--color-bus-dark)',
    '--heading-color': 'var(--color-white)',
    '--heading-color-hover': 'var(--color-white)',
    '--heading-color-expanded': 'var(--color-white)',
    '--heading-color-expanded-hover': 'var(--color-white)',
  },
  dateInput: {
    '--date-background': 'transparent',
    '--date-color': 'var(--color-black-90)',
    '--outside-date-background': 'transparent',
    '--outside-date-color': 'var(--color-black-40)',
    '--selected-date-background': 'var(--color-bus)',
    '--selected-date-color': '#fff',
  },
  deleteButton: {
    '--delete-button-color': 'var(--color-black-90)',
    '--delete-button-color-icon': 'var(--color-error)',
  },
  dropdown: {
    '--dropdown-background': 'var(--color-white)',
    '--dropdown-border-color': 'var(--color-white)',
    '--dropdown-border-color-focus': 'var(--color-black)',
    '--dropdown-color': 'var(--color-black)',
    '--dropdown-clear-button-color': 'var(--color-black-60)',
    '--dropdown-clear-button-border-top-color': 'var(--color-silver)',
    '--dropdown-divider-color': 'var(--color-silver)',
    '--dropdown-menu-background': 'var(--color-white)',
    '--dropdown-menu-color': 'var(--color-black)',
  },
  errorTemplate: {
    '--error-template-icon-color': 'var(--color-bus)',
  },
  eventCard: {
    '--event-card-background-color': 'var(--color-white)',
    '--event-card-color': 'var(--color-black-60)',
    '--event-card-icon-color': 'var(--color-black-90)',
    '--event-card-heading-color': 'var(--color-black-90)',
    '--event-card-image-background-color': 'var(--color-black-10)',
  },
  eventSearchPanel: {
    '--event-search-panel-background-color': 'var(--color-coat-of-arms)',
    '--event-search-panel-label-color': 'var(--color-white)',
    '--event-search-panel-button-background-color': 'var(--color-coat-of-arms)',
    '--event-search-panel-button-background-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--event-search-panel-button-background-color-focus':
      'var(--color-coat-of-arms)',
    '--event-search-panel-button-background-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--event-search-panel-button-border-color': 'var(--color-coat-of-arms)',
    '--event-search-panel-button-color': 'var(--color-white)',
    '--event-search-panel-button-focus-outline-color': 'var(--color-white)',
  },
  footer: {
    '--footer-background': 'var(--color-black-5)',
    '--footer-color': 'var(--color-black)',
    '--footer-divider-color': 'var(--color-black-20)',
    '--footer-focus-outline-color': 'var(--color-coat-of-arms)',
    '--footer-background-support': 'var(--color-coat-of-arms)',
    '--footer-color-support': 'var(--color-white)',
    '--footer-divider-color-support': 'var(--color-white)',
    '--footer-focus-outline-color-support': 'var(--color-white)',
  },
  imageSelector: {
    '--image-selector-focus-outline-color': 'var(--color-coat-of-arms)',
  },
  landingPage: {
    '--landing-page-cta-button-background-color': 'var(--color-coat-of-arms)',
    '--landing-page-cta-button-background-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-cta-button-background-color-focus':
      'var(--color-coat-of-arms)',
    '--landing-page-cta-button-background-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-cta-button-border-color': 'var(--color-coat-of-arms)',
    '--landing-page-cta-button-border-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-cta-button-border-color-focus': 'var(--color-coat-of-arms)',
    '--landing-page-cta-button-border-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-cta-button-color': 'var(--color-white)',
    '--landing-page-cta-button-focus-outline-color':
      'var(--color-coat-of-arms)',
    '--landing-page-hero-heading-color': 'var(--color-white)',
    '--landing-page-hero-koros-color': 'var(--color-white)',
    '--landing-page-search-button-background-color': 'transparent',
    '--landing-page-search-button-background-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-search-button-background-color-focus':
      'var(--color-coat-of-arms)',
    '--landing-page-search-button-background-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--landing-page-search-button-border-color': 'var(--color-white)',
    '--landing-page-search-button-color': 'var(--color-white)',
    '--landing-page-search-button-focus-outline-color': 'var(--color-white)',
  },
  layout: {
    '--page-background-color': 'var(--color-white)',
  },
  loadingSpinner: {
    '--spinner-color': 'var(--color-bus)',
  },
  menuDropdown: {
    '--menu-dropdown-item-background-color': 'var(--color-white)',
    '--menu-dropdown-item-background-color-disabled': 'var(--color-white)',
    '--menu-dropdown-item-background-color-highlighted':
      'var(--color-black-10)',
    '--menu-dropdown-item-color': 'var(--color-black-90)',
    '--menu-dropdown-item-color-disabled': 'var(--color-black-40)',
    '--menu-dropdown-item-color-highlighted': 'var(--color-black-90)',
  },
  modal: {
    '--modal-background-color': 'var(--color-white)',
    '--modal-heading-background-color': 'var(--color-coat-of-arms)',
    '--modal-heading-color': 'var(--color-white)',
    '--modal-heading-background-color-alert': 'var(--color-error)',
    '--modal-heading-color-alert': 'var(--color-white)',
    '--modal-heading-background-color-info': 'var(--color-bus)',
    '--modal-heading-color-info': 'var(--color-white)',
  },
  navigation: {
    '--header-background-color': 'var(--color-coat-of-arms)',
    '--header-color': 'var(--color-white)',
    '--header-divider-color': 'var(--color-black-20)',
    '--header-focus-outline-color': 'var(--color-white)',
    '--header-focus-outline-border-radius': '0px',
    '--navigation-row-background-color': 'var(--color-white)',
    '--navigation-row-color': 'var(--color-coat-of-arms)',
    '--navigation-row-focus-outline-color': 'var(--color-coat-of-arms)',
    '--navigation-item-color': 'var(--color-black-90)',
    '--mobile-menu-background-color': 'var(--color-white)',
    '--mobile-menu-color': 'var(--color-black-90)',
  },
  navigationDropdown: {
    '--menu-border-color': 'transparent',
    '--menu-button-focus-outline-color': 'var(--color-white)',
    '--menu-item-background-color': 'var(--color-white)',
    '--menu-item-background-color-highlighted': 'var(--color-black-10)',
    '--menu-item-color': 'var(--color-black-90)',
    '--menu-item-color-highlighted': 'var(--color-black)',
  },
  notification: {
    type: {
      alert: {
        ...commonNotificationVariables,
        '--notification-background-color': 'var(--color-alert-light)',
        '--notification-border-color': 'var(--color-alert-dark)',
      },

      error: {
        ...commonNotificationVariables,
        '--notification-background-color': 'var(--color-error-light)',
        '--notification-border-color': 'var(--color-error)',
      },
      info: {
        ...commonNotificationVariables,
        '--notification-background-color': 'var(--color-info-light)',
        '--notification-border-color': 'var(--color-info)',
      },

      success: {
        ...commonNotificationVariables,
        '--notification-background-color': 'var(--color-success-light)',
        '--notification-border-color': 'var(--color-success)',
      },
    },
  },
  pagination: {
    '--active-page-background-color': 'var(--color-bus)',
  },
  publicationStatus: {
    '--publication-status-color-draft': 'var(--color-black-60)',
    '--publication-status-color-public': 'var(--color-success)',
  },
  radioButton: {
    '--background': 'var(--color-white)',
    '--background-hover': 'var(--color-white)',
    '--background-focus': 'var(--color-white)',
    '--background-unselected-disabled': 'var(--color-black-10)',
    '--background-selected-disabled': 'var(--color-white)',
    '--border-color-focus': 'var(--color-black-90)',
    '--border-color-selected': 'var(--color-bus)',
    '--border-color-selected-hover': 'var(--color-bus-dark)',
    '--border-color-selected-disabled': 'var(--color-black-20)',
    '--border-color-unselected': 'var(--color-black-50)',
    '--border-color-unselected-hover': 'var(--color-black-90)',
    '--border-color-unselected-disabled': 'var(--color-black-10)',
    '--icon-color-selected': 'var(--color-bus)',
    '--icon-color-unselected': 'transparent',
    '--icon-color-hover': 'var(--color-bus-dark)',
    '--icon-color-disabled': 'var(--color-black-10)',
    '--focus-outline-color': 'var(--color-coat-of-arms)',
    '--label-color': 'var(--color-black-90)',
    '--label-color-disabled': 'var(--color-black-40)',
  },
  registrationSearchPanel: {
    '--registration-search-panel-background-color': 'var(--color-coat-of-arms)',
    '--registration-search-panel-label-color': 'var(--color-white)',
    '--registration-search-panel-button-background-color':
      'var(--color-coat-of-arms)',
    '--registration-search-panel-button-background-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--registration-search-panel-button-background-color-focus':
      'var(--color-coat-of-arms)',
    '--registration-search-panel-button-background-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--registration-search-panel-button-border-color':
      'var(--color-coat-of-arms)',
    '--registration-search-panel-button-color': 'var(--color-coat-of-arms)',
    '--registration-search-panel-button-focus-outline-color':
      'var(--color-white)',
  },
  root: {
    '--focus-outline-color': 'var(--color-coat-of-arms)',
    '--helper-color-invalid': 'var(--color-error)',
    '--icon-color-invalid': 'var(--color-error)',
  },
  searchPanel: {
    '--search-panel-background-color': 'var(--color-coat-of-arms)',
    '--search-panel-label-color': 'var(--color-white)',
    '--search-panel-button-background-color': 'var(--color-coat-of-arms)',
    '--search-panel-button-background-color-hover':
      'var(--color-coat-of-arms-dark)',
    '--search-panel-button-background-color-focus': 'var(--color-coat-of-arms)',
    '--search-panel-button-background-color-hover-focus':
      'var(--color-coat-of-arms-dark)',
    '--search-panel-button-border-color': 'var(--color-white)',
    '--search-panel-button-color': 'var(--color-white)',
    '--search-panel-button-focus-outline-color': 'var(--color-white)',
  },
  select: {
    '--dropdown-background-default': 'var(--color-white)',
    '--dropdown-background-disabled': 'var(--color-black-10)',
    '--dropdown-border-color-default': 'var(--color-black-50)',
    '--dropdown-border-color-hover': 'var(--color-black-90)',
    '--dropdown-border-color-hover-invalid': 'var(--color-error-dark)',
    '--dropdown-border-color-focus': 'var(--color-black-90)',
    '--dropdown-border-color-invalid': 'var(--color-error)',
    '--dropdown-border-color-disabled': 'var(--color-black-10)',
    '--dropdown-color-default': 'var(--color-black-90)',
    '--dropdown-color-disabled': 'var(--color-black-40)',
    '--focus-outline-color': 'var(--color-coat-of-arms)',
    '--helper-color-default': 'var(--color-black-60)',
    '--menu-divider-color': 'var(--color-black-20)',
    '--menu-item-background-default': 'var(--color-white)',
    '--menu-item-background-hover': 'var(--color-black-10)',
    '--menu-item-background-selected': 'var(--color-white)',
    '--menu-item-background-selected-hover': 'var(--color-black-10)',
    '--menu-item-background-disabled': 'var(--color-white)',
    '--menu-item-color-default': 'var(--color-black-90)',
    '--menu-item-color-hover': 'var(--color-black-90)',
    '--menu-item-color-selected': 'var(--color-black-90)',
    '--menu-item-color-selected-hover': 'var(--color-black-90)',
    '--menu-item-color-disabled': 'var(--color-black-40)',
    '--menu-item-icon-color-selected': 'var(--color-white)',
    '--menu-item-icon-color-disabled': 'var(--color-black-40)',
    '--multiselect-checkbox-background-selected': 'var(--color-bus)',
    '--multiselect-checkbox-background-disabled': 'var(--color-black-10)',
    '--multiselect-checkbox-border-default': 'var(--color-black-50)',
    '--multiselect-checkbox-border-hover': 'var(--color-black-90)',
    '--multiselect-checkbox-border-disabled': 'var(--color-black-10)',
    '--multiselect-checkbox-color-default': 'transparent',
    '--multiselect-checkbox-color-selected': 'var(--color-white)',
    '--multiselect-checkbox-color-selected-disabled': 'var(--color-white)',
    '--placeholder-color': 'var(--color-black-60)',
  },
  sideNavigation: {
    '--side-navigation-background-color': 'var(--color-white)',
    '--side-navigation-active-indicator-background-color': 'var(--color-bus)',
    '--side-navigation-icon-size': 'var(--spacing-m)',
    '--side-navigation-level-border-color': 'var(--color-white)',
    '--side-navigation-level-border-color-focus': 'var(--color-coat-of-arms)',
    '--side-navigation-level-border-color-hover': 'var(--color-black-5)',
    '--side-navigation-level-background-color': 'var(--color-white)',
    '--side-navigation-level-background-color-active': 'var(--color-black-5)',
    '--side-navigation-level-background-color-hover': 'var(--color-black-5)',
    '--side-navigation-level-color': 'var(--color-black)',
    '--side-navigation-level-color-active': 'var(--color-black)',
    '--side-navigation-level-color-hover': 'var(--color-black)',
    '--side-navigation-mobile-menu-border-color': 'var(--color-black)',
  },
  statusTag: {
    '--status-tag-background-color-cancelled': 'var(--color-error)',
    '--status-tag-color-cancelled': 'var(--color-white)',
    '--status-tag-background-color-postponed': 'var(--color-alert)',
    '--status-tag-color-postponed': 'var(--color-black)',
    '--status-tag-background-color-draft': 'var(--color-info)',
    '--status-tag-color-draft': 'var(--color-white)',
    '--status-tag-background-color-public': 'var(--color-success)',
    '--status-tag-color-public': 'var(--color-white)',
  },
  superEventTypeTag: {
    '--super-event-type-tag-background-color-recurring': 'var(--color-success)',
    '--super-event-type-tag-color-recurring': 'var(--color-white)',
    '--super-event-type-tag-background-color-umbrella': 'var(--color-info)',
    '--super-event-type-tag-color-umbrella': 'var(--color-white)',
  },
  table: {
    variant: {
      light: {
        '--header-background-color': 'var(--color-black-5)',
        '--content-background-color': 'var(--color-white)',
      },
      dark: {
        '--header-background-color': 'var(--color-bus)',
        '--content-background-color': 'var(--color-white)',
      },
    },
  },
  tabs: {
    '--tabs-icon-color': 'var(--color-success)',
    '--tabs-tab-color': 'var(--color-bus)',
    '--tabs-tab-color-active': 'var(--color-bus)',
  },
  textEditor: {
    '--text-editor-border-color': 'var(--color-black-50)',
  },
  textInput: {
    '--helper-color-default': 'var(--color-black-60)',
    '--input-background-default': 'var(--color-white)',
    '--input-background-disabled': 'var(--color-black-10)',
    '--input-border-color-default': 'var(--color-black-50)',
    '--input-border-color-hover': 'var(--color-black-90)',
    '--input-border-color-focus': 'var(--color-black-90)',
    '--input-border-color-invalid': 'var(--color-error)',
    '--input-border-color-disabled': 'var(--color-black-10)',
    '--input-color-default': 'var(--color-black-90)',
    '--input-color-disabled': 'var(--color-black-40)',
    '--label-color-default': 'var(--color-black-90)',
    '--label-color-invalid': 'var(--color-black-90)',
    '--placeholder-color': 'var(--color-black-60)',
    '--focus-outline-color': 'var(--color-coat-of-arms)',
  },
};

export default theme;
