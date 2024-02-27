import { BaseModelEntity } from 'src/common/database/entities/base.entity';
import { createdBy } from 'src/common/database/entities/createdBy';
import { softDeteles } from 'src/common/database/entities/softDeletes';
import { Column, Entity } from 'typeorm';
@Entity()
export class Lead extends BaseModelEntity implements softDeteles, createdBy {
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

  source: string;
}
