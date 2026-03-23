export const SEQUELIZE_PROVIDER = 'SEQUELIZE';
import { Sequelize } from 'sequelize-typescript';
import { Notification } from '@db/notification/entity/notification';

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

      sequelize.addModels([Notification]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
