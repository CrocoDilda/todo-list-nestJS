/* eslint-disable @typescript-eslint/no-unsafe-call */

import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  db: string;
  uri: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
  } = process.env;

  if (
    !POSTGRES_USER ||
    !POSTGRES_PASSWORD ||
    !POSTGRES_HOST ||
    !POSTGRES_PORT ||
    !POSTGRES_DB
  ) {
    throw new Error('Database env vars are missing');
  }

  return {
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    db: POSTGRES_DB,
    uri: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`,
  };
});
