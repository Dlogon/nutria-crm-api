import { BaseModelEntity } from '../../common/database/entities';
import { createdBy } from '../../common/database/entities';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Source } from '../enums/source';
import { Account } from 'src/accounts/entities/account.entity';
@Entity()
export class Lead extends BaseModelEntity implements createdBy {
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  firsName: string;
  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  jobTitle: string;

  @Column({ nullable: true })
  officePhone: string;
  @Column({ nullable: true })
  mobilePhone: string;
  @Column({ nullable: true })
  email: string;

  @Column({ type: 'enum', nullable: true, enum: Source })
  source: string;

  @OneToOne(() => Account, { cascade: ['insert', 'update'], eager: true })
  @JoinColumn()
  account: Account;
}
