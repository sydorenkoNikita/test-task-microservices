import { userScopes } from '@db/user/scopes';
import {
  Column,
  DataType,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
@Table({
  tableName: 'users',
  timestamps: false,
})
@Scopes(() => ({
  ...userScopes,
}))
export class User extends Model<User> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
    name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
    email: string;
}
