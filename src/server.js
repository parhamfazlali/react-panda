/* @flow */

import React from 'react';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(cookieParser());


app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.resolve(process.cwd(), 'public/favicon.ico')));

if (__DEV__) {
  /* Run express as webpack dev server */
  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  compiler.apply(new webpack.ProgressPlugin());

  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { 'Access-Control-Allow-Origin': '*' },
      hot: true,
      quiet: true, // Turn it on for friendly-errors-webpack-plugin
      noInfo: true,
      writeToDisk: true,
      stats: 'minimal',
      serverSideRender: true
    })
  );

  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false // Turn it off for friendly-errors-webpack-plugin
    })
  );
}