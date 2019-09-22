/* @flow */

export default {
  host: process.env.NODE_HOST,
  port: process.env.NODE_PORT,
  apiUrl: process.env.API_URL,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Panda',
    titleTemplate: 'React Panda - %s',
    pandaImage: '/assets/images/panda-logo.png',
    meta: [
      {
        name: 'description',
        content: 'React boilerplate'
      }
    ]
  }
};
