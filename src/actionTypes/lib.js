/* @flow */
import { flatten } from 'lodash';
import pluralize from 'pluralize';

export function flattener(constants: any) {
  return flatten(constants).reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
}

export function single(type: string = '') {
  return type.toUpperCase();
}

export function promise(type: string = '', action: ?string) {
  const str = type.toUpperCase();
  const strPlural = pluralize(str);

  if (action) {
    const request = action.toUpperCase();

    const create = request.includes('C')
      ? [
          `CREATE_${str}_REQUESTING`,
          `CREATE_${str}_SUCCESS`,
          `CREATE_${str}_FAILURE`
        ]
      : [];

    const load = request.includes('L')
      ? [`LOAD_${str}_REQUESTING`, `LOAD_${str}_SUCCESS`, `LOAD_${str}_FAILURE`]
      : [];

    const update = request.includes('U')
      ? [
          `UPDATE_${str}_REQUESTING`,
          `UPDATE_${str}_SUCCESS`,
          `UPDATE_${str}_FAILURE`
        ]
      : [];

    const del = request.includes('D')
      ? [
          `DELETE_${str}_REQUESTING`,
          `DELETE_${str}_SUCCESS`,
          `DELETE_${str}_FAILURE`
        ]
      : [];

    const loadAll = request.includes('A')
      ? [
          `LOAD_ALL_${strPlural}_REQUESTING`,
          `LOAD_ALL_${strPlural}_SUCCESS`,
          `LOAD_ALL_${strPlural}_FAILURE`
        ]
      : [];

    return [...create, ...load, ...update, ...del, ...loadAll];
  }

  return [`${str}`, `${str}_SUCCESS`, `${str}_FAILURE`];
}
