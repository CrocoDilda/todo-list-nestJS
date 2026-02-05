import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

const USER = env('POSTGRES_USER');
const PASSWORD = env('POSTGRES_PASSWORD');
const HOST = env('POSTGRES_HOST');
const PORT = env('POSTGRES_PORT');
const DB = env('POSTGRES_DB');

const URL = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}`;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: { url: URL },
});
