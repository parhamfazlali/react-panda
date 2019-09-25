// @flow
import queryString from 'query-string';

const create = (location: Object, query?: Object, hash?: Object) => ({
  ...location,
  ...(query && {
    search: queryString.stringify({
      ...query
    })
  }),
  ...(hash && {
    hash: queryString.stringify({
      ...hash
    })
  })
});

const update = (location: Object, query?: Object, hash?: Object) => ({
  ...location,
  ...(query && {
    search: queryString.stringify({
      ...queryString.parse(location.search),
      ...query
    })
  }),
  ...(hash && {
    hash: queryString.stringify({
      ...queryString.parse(location.hash),
      ...hash
    })
  })
});

const parse = (location: Object) => queryString.parse(location.search);

export default {
  create,
  update,
  parse
};
