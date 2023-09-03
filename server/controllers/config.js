'use strict';

module.exports = {
  /**
   * Re-generate all image's blurhashes
   *
   * @param {object} ctx - Request context object.
   * @returns {void}
   */
  exportAll: async (ctx) => {
    await strapi
      .plugin('strapi-blurhash')
      .service('blurhash')
      .regenerateAllBlurhashes();

    ctx.send({
      message: 'All blurhashes successfuly regenerated',
    });
  },
};
