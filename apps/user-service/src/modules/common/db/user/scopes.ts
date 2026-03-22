import { FindOptions } from 'sequelize';

export enum ScopeName {
  name = 'name',
  email = 'email',
}

export const userScopes = {
  [ScopeName.name]: (name?: string): FindOptions => {
    if (!name) {
      return {};
    }

    return {
      where: {
        name,
      },
    };
  },
  [ScopeName.email]: (email?: string): FindOptions => {
    if (!email) {
      return {};
    }

    return {
      where: {
        email,
      },
    };
  },
};
