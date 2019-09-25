/* @flow */

import React from 'react';
import { matchRoutes, renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import url from 'utils/url';

// Import your global styles here
import 'normalize.css/normalize.css'; // eslint-disable-line import/first

import config from '../../config';
import styles from './styles.scss';

require('../theme/App.scss');

type Props = { location: Object, route: Object };

const App = ({ location, route }: Props) => {
  const result = matchRoutes(route.routes, location.pathname)[0];
  const { params } = result.match;
  const query = url.parse(location);

  return (
    <div className={styles.App}>
      <Helmet {...config.app} />
      <div className={styles.header}>
        <img src={config.app.pandaImage} alt="" />
      </div>
      {/* Child routes won't render without this */}
      <div className={styles.contents}>
        {renderRoutes(route.routes, { params, query })}
      </div>
    </div>
  );
};

export default hot(module)(App);
