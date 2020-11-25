export enum ROUTES {
  CREATE_EVENT = '/event/create',
  EVENTS = '/events',
  HELP = '/help',
  HOME = '/',
  SEARCH = '/search',
}

// Supported languages
export enum SUPPORTED_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export enum CHARACTER_LIMITS {
  SHORT_STRING = 160,
  MEDIUM_STRING = 320,
  LONG_STRING = 5000,
}

export enum INPUT_MAX_WIDTHS {
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum KEYWORD_SETS {
  AUDIENCES = 'helsinki:audiences',
  TOPICS = 'helsinki:topics',
}

export enum INCLUDE {
  KEYWORDS = 'keywords',
}

export enum WEEK_DAY {
  MON = 'mon',
  TUE = 'tue',
  WED = 'wed',
  THU = 'thu',
  FRI = 'fri',
  SAT = 'sat',
  SUN = 'sun',
}

export const DATE_FORMAT = 'dd.MM.yyyy';
export const DATETIME_FORMAT = `${DATE_FORMAT} HH.mm`;

export const EXTLINK = {
  EXTLINK_FACEBOOK: 'extlink_facebook',
  EXTLINK_INSTAGRAM: 'extlink_instagram',
  EXTLINK_TWITTER: 'extlink_twitter',
  EXTLINK_YOUTUBE: 'extlink_youtube',
};

export const MAIN_CONTENT_ID = 'maincontent';
