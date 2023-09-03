'use strict';

import {
  Box,
  Button,
  ContentLayout,
  HeaderLayout,
  Loader,
} from '@strapi/design-system';
import { useNotification, request } from '@strapi/helper-plugin';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

const SettingsSection = () => {
  const { formatMessage } = useIntl();

  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const regenerateAllBlurhashes = async () => {
    setIsLoading(true);

    try {
      await request('/strapi-blurhash/regenerate', { method: 'POST' });

      toggleNotification({
        type: 'success',
        message: formatMessage({
          id: 'Settings.notifications.success',
        }),
      });
    } catch {
      toggleNotification({
        type: 'warning',
        message: formatMessage({
          id: 'Settings.notifications.error',
        }),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box background="neutral100">
        <HeaderLayout
          title={formatMessage({ id: 'strapi-blurhash.Settings.title' })}
          subtitle={formatMessage({ id: 'strapi-blurhash.Settings.subtitle' })}
          as="h2"
        />
      </Box>
      <ContentLayout paddingBottom={8}>
        <Button disabled={isLoading} onClick={regenerateAllBlurhashes}>
          {formatMessage({ id: 'strapi-blurhash.Settings.regenerate' })}
        </Button>
        {isLoading && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Loader>
              {formatMessage({ id: 'strapi-blurhash.Settings.processing' })}
            </Loader>
          </div>
        )}
      </ContentLayout>
    </>
  );
};

export default SettingsSection;
