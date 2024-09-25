import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  skipValidation: process.env.SKIP_ENV_VALIDATION === '1',

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },

  server: {
    NODE_ENV: z.string(),
    OPENAI_API_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },
});
