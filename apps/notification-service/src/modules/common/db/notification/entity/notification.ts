import {
  Model,
  Table,
  Column,
  Scopes,
  DataType,
} from 'sequelize-typescript';
import { NotificationStatus } from '@app/shared';
import { notificationScopes } from '@db/notification/scopes';

@Table({
  tableName: 'notifications',
  timestamps: false,
})
@Scopes(() => ({
  ...notificationScopes,
}))
export class Notification extends Model<Notification> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
    webhookUrl: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
    message: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
    userId: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
    sentAt: Date;

  @Column({
    allowNull: false,
    defaultValue: NotificationStatus.PENDING,
    type: DataType.ENUM(...Object.values(NotificationStatus)),
  })
    status: NotificationStatus;
}
