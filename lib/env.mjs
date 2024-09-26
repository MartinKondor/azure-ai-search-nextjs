import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  skipValidation: process.env.SKIP_ENV_VALIDATION === '1',

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    AZURE_STORAGE_SAS_TOKEN: process.env.AZURE_STORAGE_SAS_TOKEN,
    AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    AZURE_STORAGE_CONTAINER_NAME: process.env.AZURE_STORAGE_CONTAINER_NAME,

    AZURE_SEARCH_SERVICE_ENDPOINT: process.env.AZURE_SEARCH_SERVICE_ENDPOINT,
    AZURE_SEARCH_ADMIN_KEY: process.env.AZURE_SEARCH_ADMIN_KEY,
    AZURE_SEARCH_INDEX_NAME: process.env.AZURE_SEARCH_INDEX_NAME,
  },

  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),

    AZURE_STORAGE_SAS_TOKEN: z.string(),
    AZURE_STORAGE_ACCOUNT_NAME: z.string(),
    AZURE_STORAGE_CONTAINER_NAME: z.string(),

    AZURE_SEARCH_SERVICE_ENDPOINT: z.string().url(),
    AZURE_SEARCH_ADMIN_KEY: z.string(),
    AZURE_SEARCH_INDEX_NAME: z.string(),
  },

  client: {},
});
