import { User } from '@db/user/entity/user';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export const usersProviders = [
  {
    useValue: User,
    provide: USERS_REPOSITORY,
  },
];
