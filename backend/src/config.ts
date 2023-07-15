export const PRODUCTION = process.env['NODE_ENV'] === 'production';

export const jwtConfig = {
  secret: process.env['JWT_SECRET'] || 'WARNING!!!',
  saltRounds: process.env['JWT_SALT_ROUNDS'] || 10,
};

export const pgConfig = {
  synchronize: !PRODUCTION,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testfullstack',
};
