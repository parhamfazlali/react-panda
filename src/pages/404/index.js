/* @flow */

import React from 'react';
import Helmet from 'react-helmet';

import StyleWrapper from './notfound.style';

type Props = { staticContext: Object };

export default ({ staticContext }: Props) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  /* istanbul ignore next */
  if (staticContext) staticContext.status = '404'; // eslint-disable-line no-param-reassign

  return (
    <StyleWrapper>
      <Helmet title="Oops" />
      <p>Oops, Page was not found!</p>
    </StyleWrapper>
  );
};
