export const NAME_REGEXP = /^[a-zA-Z,-]+$/;
export const PHONE_REGEXP = /^\+?[0-9]+$/;
export const CASE_CHECK_REGEXP = /(?=.*[a-z])(?=.*[A-Z])/;
export const LETTERS_NUMBERS_CHECK_REGEXP =
  /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)|(?=.*\W)$/;
export const SPECIAL_SYMBOLS_CHECK_REGEXP = /(?=.*\W)/;
export const MINIMUM_LENGHT_TEXT = 'at least 8 characters';
export const MIX_CASES_TEXT =
  'a mixture of both uppercase and lowercase letters';
export const MIX_LETTERS_NUMBERS_TEXT = 'a mixture of letters and numbers';
export const SPECIAL_SYMBOLS_TEXT =
  'inclusion of at least one special character, e.g., ! @ # ? ]';
export const INITIAL_BAGGAGE = 0;
export const MAX_BAGGAGE = 2;
export const DIAL_CODE_REGEXP = /\((.*?)\)/;
export const LOCAL_STORAGE_BOOKING_KEY = 'currentBookingInfo';
export const USER_MIN_AGE = 18;
export const ADULT_MIN_AGE = 15;
export const CHILD_MIN_AGE = 2;
export const CHILD_MAX_AGE = 14;
export const INFANT_MAX_AGE = 1;
