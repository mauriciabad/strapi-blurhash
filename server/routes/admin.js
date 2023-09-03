'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'POST',
      path: '/regenerate',
      handler: 'config.regenerate',
      config: {
        policies: [],
      },
    },
  ],
};
