export const NAME_REGEXP = /^[a-zA-Z,-]+$/;
export const PHONE_REGEXP = /^\+?[0-9]\d{1,20}$/;
export const CASE_CHECK_REGEXP = /(?=.*[a-z])(?=.*[A-Z])/;
export const LETTERS_NUMBERS_CHECK_REGEXP =
  /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)|(?=.*\W)$/;
export const SPECIAL_SYMBOLS_CHECK_REGEXP = /(?=.*\W)/;
