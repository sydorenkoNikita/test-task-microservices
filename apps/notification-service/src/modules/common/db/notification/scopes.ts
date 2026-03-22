import { FindOptions } from 'sequelize';

export enum ScopeName {
  userId = 'userId',
  webhookUrl = 'webhookUrl',
}

export const notificationScopes = {
  [ScopeName.webhookUrl]: (webhookUrl?: string): FindOptions => {
    if (!webhookUrl) {
      return {};
    }

    return {
      where: {
        webhookUrl,
      },
    };
  },
  [ScopeName.userId]: (userId?: string): FindOptions => {
    if (!userId) {
      return {};
    }

    return {
      where: {
        userId,
      },
    };
  },
};
