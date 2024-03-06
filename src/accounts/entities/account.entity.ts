import { BaseModelEntity } from '../../common/database/entities';
import { Column, Entity } from 'typeorm';
import { Industry } from '../enums/industry';
import { AccountType } from '../enums/accountType';

@Entity()
export class Account extends BaseModelEntity {
  @Column({ nullable: true })
  firsName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  alias: string;

  @Column({ nullable: true })
  officePhone: string;

  @Column({ nullable: true })
  mobilePhone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: 'enum', nullable: true, enum: Industry })
  industry: string;

  @Column({ type: 'enum', nullable: true, enum: AccountType })
  type: string;
}
