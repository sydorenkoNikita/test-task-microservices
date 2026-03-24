export const RMQ_SERVICE = 'RMQ_SERVICE';
export const RMQ_NOTIFICATION_QUEUE = 'notification_queue';
export const RMQ_NOTIFICATION_PATTERNS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
} as const;
