import { prefixPluginTranslations } from '@strapi/helper-plugin';

export default {
  register(app) {
    app.createSettingSection(
      {
        id: 'strapi-blurhash',
        intlLabel: {
          id: 'strapi-blurhash.plugin.name',
          defaultMessage: 'BlurHash',
        },
      },
      [
        {
          intlLabel: {
            id: 'strapi-blurhash.Settings.sectionTitle',
            defaultMessage: 'Re-generate',
          },
          id: 'strapi-blurhash-settings-section',
          to: '/settings/strapi-blurhash',
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "strapi-blurhash-settings-section" */ './containers/App'
            );

            return component;
          },
        },
      ]
    );
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "strapi-blurhash-translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, 'strapi-blurhash'),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
