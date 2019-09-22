/* @flow */

import React from 'react';
import Helmet from 'react-helmet';

import StyleWrapper from './error.style';

type Props = { staticContext: Object };

export default ({ staticContext }: Props) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  /* istanbul ignore next */
  if (staticContext) staticContext.status = '500'; // eslint-disable-line no-param-reassign

  return (
    <StyleWrapper>
      <Helmet title="Oops" />
      <p>Oops, Internal Server Error</p>
    </StyleWrapper>
  );
};
