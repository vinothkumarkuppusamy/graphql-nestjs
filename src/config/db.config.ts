import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export default registerAs(
  'db_config',
  (): PostgresConnectionOptions => ({
    type: 'postgres',
    url: process.env.DB_URL,
    port: 5000,
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  }),
);
