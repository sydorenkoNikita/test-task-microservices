import { User } from '@db/user/entity/user';
import { Sequelize } from 'sequelize-typescript';

export const SEQUELIZE_PROVIDER = 'SEQUELIZE';

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        logging: false,
        dialect: 'postgres',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      });

      sequelize.addModels([User]);

      return sequelize;
    },
  },
];
