import { BaseModelEntity } from '@common/database/entities';
import { Column, Entity } from 'typeorm';

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

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  type: string;
}
