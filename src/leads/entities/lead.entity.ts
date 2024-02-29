import { BaseModelEntity } from '../../common/database/entities';
import { createdBy } from '../../common/database/entities';
import { Column, Entity } from 'typeorm';
import { Source } from '../enums/source';
@Entity()
export class Lead extends BaseModelEntity implements createdBy {
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  deletedAt: Date;

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

  @Column({ type: 'enum', nullable: true, enum: Source })
  source: string;
}
