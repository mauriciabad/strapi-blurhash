'use strict';

const { getPlaiceholder } = require('plaiceholder');

module.exports = ({ strapi }) => ({
  async generateBlurhash(url) {
    try {
      return (await getPlaiceholder(url)).blurhash.hash;
    } catch (e) {
      strapi.log.error(e);
      return null;
    }
  },

  async regenerateAllBlurhashes() {
    const uploads = await strapi.query('plugin::upload.file').findMany();
    for (const item of uploads) {
      if (item.mime && item.mime.startsWith('image/') && !item.blurhash) {
        const blurhash = await strapi
          .plugin('strapi-blurhash')
          .service('blurhash')
          .generateBlurhash(item.url);
        await strapi.db.query('plugin::upload.file').update({
          where: { id: item.id },
          data: {
            blurhash,
          },
        });
      }
    }
    strapi.log.debug('Finished generating blurhashes');
  },
});
