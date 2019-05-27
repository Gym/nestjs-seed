import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const connectionOptions: ConnectionOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  username: 'user',
  password: 'password',
  database: 'demo',
  synchronize: true,
  logging: false,
  entities: [join(__dirname, 'src/**/entities/**/*.entity.{js,ts}')],
  //   migrations: ['server/src/**/migrations/**/*.ts'],
  //   subscribers: ['server/src/**/subscribers/**/*.ts'],
  useNewUrlParser: true,
};

export default connectionOptions;
