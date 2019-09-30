import { isNil } from 'lodash';
import { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';

export function createValidator(rules) {
  const join = array => (str, data) =>
    array.map(rule => rule(str, data)).filter(error => !!error)[0];

  return (data = {}) => {
    const cloneData = data;
    const errors = {};
    Object.keys(rules).forEach(key => {
      if (Array.isArray(rules[key])) {
        const rule = join([].concat(rules[key]));
        const error = rule(data[key], data);
        if (error) {
          errors[key] = error;
        }
      } else {
        cloneData[key] = cloneData[key] ? cloneData[key] : {};
        errors[key] = [];
        let changed = false;
        Object.keys(rules[key]).forEach(keyChild => {
          const rule = join([].concat(rules[key][keyChild]));
          const error = rule(cloneData[key][keyChild], cloneData[key]);
          if (error) {
            changed = true;
            errors[key][keyChild] = error;
          }
        });
        if (!changed) {
          delete errors[key];
        }
      }
    });
    return errors;
  };
}

export function dxCode(num) {
  return str =>
    isNil(str) || (str && str.length !== num) ? `Invalid barcode` : undefined;
}

export function equals(comparison, message) {
  return (str, data) =>
    isNil(str) || isNil(data) || validator.equals(str, data[comparison])
      ? null
      : message;
}

export function isAlpha(locale = ['en-AU']) {
  return str =>
    isNil(str) || validator.isAlpha(str, locale) ? null : 'Only letters';
}

export function isAlphanumeric(locale = ['en-AU']) {
  return str =>
    isNil(str) || validator.isAlphanumeric(str, locale)
      ? null
      : 'Only letters and numbers';
}

export function isBarcode() {
  return str =>
    isNil(str) || /^[m|M][p|P][e|E][a-zA-Z0-9]*$/.test(str.trim())
      ? null
      : 'Invalid';
}

export function isCheck() {
  return str => (isNil(str) || str === false ? 'Required' : '');
}

export function isCreditCard() {
  return str =>
    isNil(str) || validator.isCreditCard(str) ? null : 'Invalid credit card';
}

export function isCurrency(options) {
  return str =>
    isNil(str) || validator.isCurrency(str, options)
      ? null
      : 'Invalid credit card';
}

export function isEmail(options = { require_tld: true }) {
  return str =>
    isNil(str) || validator.isEmail(str, options) ? null : 'Invalid email';
}

export function isFill(options) {
  return str =>
    isNil(str) || validator.isEmpty(String(str), options) ? 'Required' : null;
}

export function isIn(values) {
  return str =>
    isNil(str) || validator.isIn(str, values)
      ? null
      : `One of ${values.join(', ')}`;
}

export function isInt(options) {
  return str =>
    isNil(str) || validator.isInt(String(str), options)
      ? null
      : 'Invalid integer';
}

export function isMobilePhone(
  locale = 'en-AU',
  options = { strictMode: false }
) {
  return str =>
    isNil(str) || validator.isMobilePhone(str, locale, options)
      ? null
      : 'Invalid mobile phone';
}

export function isName() {
  return str =>
    isNil(str) || /^[a-zA-Z][a-zA-Z\s.]*[a-zA-Z]$/.test(str.trim())
      ? null
      : 'Invalid';
}

export function isPassword() {
  const regex = /^(?=.*[0-8].*)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z@#^()|\\?<>:;,.~"'`*$\-+?_&=!%{}[\]/]*$/;
  return str =>
    isNil(str) || regex.test(str)
      ? null
      : 'min 8 characters, at least one num and upper-case letter';
}

export function isPhone() {
  return str =>
    isNil(str) || isValidPhoneNumber(str) ? null : 'Invalid phone';
}

export default {
  createValidator,
  dxCode,
  equals,
  isAlpha,
  isAlphanumeric,
  isBarcode,
  isCheck,
  isCreditCard,
  isCurrency,
  isEmail,
  isFill,
  isIn,
  isInt,
  isMobilePhone,
  isName,
  isPassword,
  isPhone
};
