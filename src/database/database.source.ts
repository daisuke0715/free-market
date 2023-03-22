import { DataSource } from 'typeorm';
import { entitiesDir, migrationsDir } from './database.module';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: true,
});
