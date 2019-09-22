/* @flow */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';

// Import your global styles here
import 'normalize.css/normalize.css'; // eslint-disable-line import/first

import config from '../../config';
import styles from './styles.scss';

import 'antd/dist/antd.css';

require('../theme/App.scss');

type Props = { route: Object };

const App = ({ route }: Props) => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    <div className={styles.header}>
      <img src={config.app.pandaImage} alt="" />
    </div>
    {/* Child routes won't render without this */}
    <div className={styles.contents}>{renderRoutes(route.routes)}</div>
  </div>
);

export default hot(module)(App);
