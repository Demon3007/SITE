import {
  AllowNull,
  Column,
  HasMany,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  BeforeSave,
  AutoIncrement,
} from "sequelize-typescript";
import { CreationUserAttributes, UserAttributes } from "../types/UserTypes";

@Table({
  timestamps: false,
})
export class User extends Model<UserAttributes, CreationUserAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  login!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(100))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;
}
