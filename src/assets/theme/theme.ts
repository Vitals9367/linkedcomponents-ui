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
      '--border-color': 'var(--color-bus)',
      '--border-color-hover': 'var(--color-bus-dark)',
      '--border-color-focus': 'var(--color-bus)',
      '--border-color-hover-focus': 'var(--color-bus-dark)',
      '--border-color-disabled': 'var(--color-black-50)',
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
    '--size': '24px',
    '--icon-scale': 1,
    '--border-radius': '1px',
    '--border-width': '2px',
    '--outline-width': '3px',
    '--label-font-size': 'var(--fontsize-body-m)',
    '--label-padding': 'var(--spacing-2-xs)',
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
    '--heading-background-color': 'var(--color-white)',
    '--heading-border-color': 'var(--color-bus)',
    '--heading-color': 'var(--color-bus)',
    '--heading-background-color-expanded': 'var(--color-bus)',
    '--heading-border-color-expanded': 'var(--color-bus)',
    '--heading-color-expanded': 'var(--color-white)',
    '--heading-background-color-expanded-hover': 'var(--color-bus-dark)',
    '--heading-border-color-expanded-hover': 'var(--color-bus-dark)',
    '--heading-color-expanded-hover': 'var(--color-white)',
    '--heading-background-color-hover': 'var(--color-bus-light)',
    '--heading-color-hover': 'var(--color-bus-dark)',
  },
  datepicker: {
    '--calendar-button-height': '56px',
    '--close-button-color': 'var(--color-bus)',
    '--day-background-color': 'transparent',
    '--day-background-color-disabled': 'transparent',
    '--day-background-color-focused': 'transparent',
    '--day-background-color-hovered': 'var(--color-black-10)',
    '--day-background-color-selected': 'var(--color-bus)',
    '--day-border-color': 'transparent',
    '--day-border-color-disabled': 'transparent',
    '--day-border-color-focused': 'var(--color-bus)',
    '--day-border-color-hovered': 'transparent',
    '--day-border-color-selected': 'transparent',
    '--day-color': 'var(--color-black)',
    '--day-color-disabled': '#6d7278',
    '--day-color-focused': 'var(--color-black)',
    '--day-color-hovered': 'var(--color-black)',
    '--day-color-selected': 'var(--color-white)',
    '--day-size': 'var(--spacing-xl)',
    '--datepicker-background-color': 'var(--color-white)',
    '--datepicker-container-padding': 'var(--spacing-s)',
    '--datepicker-z-index': 101,
    '--icon-width': 'var(--spacing-m)',
    '--input-spacing': 'var(--spacing-s)',
    '--month-title-color': 'var(--color-black)',
    '--times-divider-border-color': 'var(--color-black-10)',
    '--times-list-width': '110px',
    '--time-item-background-color': 'transparent',
    '--time-item-background-color-selected': 'rgba(0, 0, 0, 0.1)',
  },
  deleteButton: {
    '--delete-button-color': 'var(--color-error)',
    '--delete-button-height': '56px',
    '--delete-button-padding': 'var(--spacing-s)',
  },
  dropdown: {
    '--dropdown-background': 'var(--color-white)',
    '--dropdown-border-color': 'var(--color-white)',
    '--dropdown-border-color-focus': 'var(--color-black)',
    '--dropdown-color': 'var(--color-black)',
    '--dropdown-button-height': 'var(--spacing-3-xl)',
    '--dropdown-clear-button-color': 'var(--color-black-60)',
    '--dropdown-clear-button-border-top-color': 'var(--color-silver)',
    '--dropdown-divider-color': 'var(--color-silver)',
    '--dropdown-icon-size': '24px',
    '--dropdown-menu-background': 'var(--color-white)',
    '--dropdown-menu-color': 'var(--color-black)',
    '--dropdown-menu-max-height': '18.35rem',
    '--dropdown-menu-z-index': 100,
  },
  errorTemplate: {
    '--error-template-icon-color': 'var(--color-bus)',
    '--error-template-icon-size': '112px',
  },
  eventCard: {
    '--event-card-background-color': 'var(--color-white)',
    '--event-card-color': 'var(--color-black-60)',
    '--event-card-icon-color': 'var(--color-black-90)',
    '--event-card-heading-color': 'var(--color-black-90)',
    '--event-card-image-background-color': 'var(--color-black-10)',
    '--event-card-image-min-height': '7.5rem',
    '--event-card-mobile-image-min-height': '12rem',
  },
  eventSearchPanel: {
    '--event-search-panel-background-color': 'var(--color-coat-of-arms)',
    '--event-search-panel-label-color': 'var(--color-white)',
  },
  footer: {
    '--footer-background': 'var(--color-coat-of-arms)',
    '--footer-color': 'var(--color-white)',
    '--footer-divider-color': 'var(--color-white)',
    '--footer-focus-outline-color': 'var(--color-white)',
  },
  imageSelector: {
    '--image-selector-focus-outline-color': 'var(--color-coat-of-arms)',
  },
  layout: {
    '--page-background-color': 'var(--color-white)',
  },
  languageSelector: {
    '--dropdown-background-default': 'var(--color-black)',
    '--dropdown-border-color-default': 'transparent',
    '--dropdown-border-color-hover': 'transparent',
    '--dropdown-border-color-focus': 'transparent',
    '--dropdown-color-default': 'inherit',
    '--placeholder-color': 'inherit',
    '--menu-z-index': 10,
    '--menu-item-background-default': 'var(--color-white)',
    '--menu-item-background-hover': 'var(--color-black-10)',
    '--menu-item-color-default': 'var(--color-black-90)',
    '--menu-item-color-hover': 'var(--color-black-90)',
  },
  loadingSpinner: {
    '--spinner-background-color': 'transparent',
    '--spinner-color': 'var(--color-bus)',
    '--spinner-width': '120px',
    '--spinner-stroke-width': '20px',
  },
  menuDropdown: {
    '--menu-dropdown-item-background-color': 'var(--color-white)',
    '--menu-dropdown-item-background-color-disabled': 'var(--color-white)',
    '--menu-dropdown-item-background-color-highlighted': 'var(--color-bus)',
    '--menu-dropdown-item-color': 'var(--color-black-90)',
    '--menu-dropdown-item-color-disabled': 'var(--color-black-40)',
    '--menu-dropdown-item-color-highlighted': 'var(--color-white)',
  },
  modal: {
    '--modal-background-color': 'var(--color-white)',
    '--modal-bottom': '0px',
    '--modal-label-height': '22px',
    '--modal-max-width-m': '558px',
    '--modal-max-width-l': '1157px',
    '--modal-top': '0px',
    '--modal-z-index': 102,
    '--modal-heading-background-color': 'var(--color-coat-of-arms)',
    '--modal-heading-color': 'var(--color-white)',
    '--modal-heading-background-color-alert': 'var(--color-error)',
    '--modal-heading-color-alert': 'var(--color-white)',
    '--modal-heading-background-color-info': 'var(--color-bus)',
    '--modal-heading-color-info': 'var(--color-white)',
  },
  navigation: {
    '--header-z-index': 101,
    '--header-background-color': 'var(--color-coat-of-arms)',
    '--header-color': 'var(--color-white)',
    '--header-divider-color': 'var(--color-black-20)',
    '--header-focus-outline-color': 'var(--color-white)',
    '--navigation-row-background-color': 'var(--color-white)',
    '--navigation-row-color': 'var(--color-coat-of-arms)',
    '--navigation-row-focus-outline-color': 'var(--color-coat-of-arms)',
    '--navigation-item-color': 'var(--color-black-90)',
    '--mobile-menu-z-index': 101,
    '--mobile-menu-background-color': 'var(--color-white)',
    '--mobile-menu-color': 'var(--color-black-90)',
  },
  notification: {
    size: {
      default: {
        '--notification-padding': 'var(--spacing-s)',
      },
      large: {
        '--notification-padding': 'var(--spacing-l)',
      },
      small: {
        '--notification-padding': 'var(--spacing-2-xs)',
      },
    },
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
    '--pagination-item-background-color': 'transparent',
    '--pagination-item-background-color-disabled': 'transparent',
    '--pagination-item-background-color-hover':
      'var(--color-coat-of-arms-light)',
    '--pagination-item-background-color-selected': 'var(--color-coat-of-arms)',
    '--pagination-item-color': 'var(--color-black)',
    '--pagination-item-color-disabled': 'var(--color-black-40)',
    '--pagination-item-color-hover': 'var(--color-black)',
    '--pagination-item-color-selected': 'var(--color-white)',
    '--pagination-item-size': '40px',
    '--pagination-item-border-radius': '20px',
  },
  publicationStatus: {
    '--publication-status-color-draft': 'var(--color-black-60)',
    '--publication-status-color-public': 'var(--color-success)',
  },
  radioButton: {
    '--size': '24px',
    '--icon-scale': 0.5,
    '--border-width': '2px',
    '--outline-width': '3px',
    '--label-font-size': 'var(--fontsize-body-m)',
    '--label-padding': 'var(--spacing-2-xs)',
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
  root: {
    '--focus-outline-color': 'var(--color-coat-of-arms)',
    '--focus-outline-width': '3px',
    '--input-height': '56px',
    '--input-max-width-m': '448px',
    '--input-max-width-l': '566px',
    '--label-height': '28px',
  },
  select: {
    '--border-radius': '2px',
    '--border-width': '2px',
    '--divider-width': '1px',
    '--focus-outline-width': '3px',
    '--dropdown-height': 'var(--spacing-3-xl)',
    '--menu-item-height':
      'calc(var(--dropdown-height) - var(--border-width) * 2)',
    '--icon-size': 'var(--spacing-m)',
    '--menu-z-index': 101,
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
    '--helper-color-invalid': 'var(--color-error)',
    '--menu-divider-color': 'var(--color-black-20)',
    '--menu-item-background-default': 'var(--color-white)',
    '--menu-item-background-hover': 'var(--color-bus)',
    '--menu-item-background-selected': 'var(--color-white)',
    '--menu-item-background-selected-hover': 'var(--color-bus)',
    '--menu-item-background-disabled': 'var(--color-white)',
    '--menu-item-color-default': 'var(--color-black-90)',
    '--menu-item-color-hover': 'var(--color-white)',
    '--menu-item-color-selected': 'var(--color-black-90)',
    '--menu-item-color-selected-hover': 'var(--color-white)',
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
    '--side-navigation-level-border-width': '2px',
    '--side-navigation-level-background-color': 'var(--color-white)',
    '--side-navigation-level-background-color-active': 'var(--color-black-5)',
    '--side-navigation-level-background-color-hover': 'var(--color-black-5)',
    '--side-navigation-level-color': 'var(--color-black)',
    '--side-navigation-mobile-menu-border-color': 'var(--color-black)',
    '--side-navigation-mobile-menu-border-width': '2px',
    '--side-navigation-mobile-menu-z-index': 100,
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
    '--table-body-background': 'var(--color-white)',
    '--table-body-row-border-color': 'var(--color-black-10)',
    '--table-head-background': 'var(--color-black-5)',
  },
  tabs: {
    '--tabs-icon-color': 'var(--color-success)',
    '--tabs-tab-color': 'var(--color-bus)',
    '--tabs-tab-color-active': 'var(--color-bus)',
  },
  textEditor: {
    '--text-editor-border-color': 'var(--color-black-50)',
    '--text-editor-editor-max-height': '20rem',
    '--text-editor-editor-min-height': 'var(--spacing-layout-2-xl)',
    '--text-editor-toolbar-border-color': 'var(--color-black-20)',
  },
  textInput: {
    '--border-radius': '2px',
    '--border-width': '2px',
    '--outline-width': '3px',
    '--input-height': '56px',
    '--textarea-height': '149px',
    '--icon-size': 'var(--spacing-m)',
    '--helper-color-default': 'var(--color-black-60)',
    '--helper-color-invalid': 'var(--color-error)',
    '--icon-color-invalid': 'var(--color-error)',
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
  timepicker: {
    '--menu-background-color': 'var(--color-white)',
    '--menu-border-color': 'var(--input-border-color-default)',
    '--menu-max-height': '20rem',
    '--menu-z-index': 101,
    '--menu-item-background-color': 'transparent',
    '--menu-item-background-color-highlighted': 'var(--color-black-10)',
    '--menu-item-fontsize': 'var(--fontsize-body-l)',
    '--menu-item-spacing': 'var(--spacing-s)',
  },
};

export default theme;
