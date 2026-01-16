import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const SUPPORTED_HEADERS = ['Authorization', 'Content-Type'];

const CorsLocal: CorsOptions = {
  origin: ['http://localhost:4201', 'http://localhost:4200'],
  allowedHeaders: SUPPORTED_HEADERS,
};

const CorsProd: CorsOptions = {
  origin: ['https://torneo-galactico.netlify.app'],
  allowedHeaders: SUPPORTED_HEADERS,
};

export const CorsConfig = {
  local: CorsLocal,
  production: CorsProd,
} as const;
