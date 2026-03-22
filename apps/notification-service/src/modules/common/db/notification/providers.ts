import { Notification } from '@db/notification/entity/notification';

export const NOTIFICATIONS_REPOSITORY = 'NOTIFICATIONS_REPOSITORY';

export const notificationsProviders = [
  {
    useValue: Notification,
    provide: NOTIFICATIONS_REPOSITORY,
  },
];
