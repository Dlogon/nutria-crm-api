import { BaseModelEntity } from 'src/common/database/entities/base.entity';
import { softDeteles } from 'src/common/database/entities/softDeletes';
import { Column, Entity } from 'typeorm';
@Entity()
export class Lead extends BaseModelEntity implements softDeteles {
  @Column({ nullable: true })
  deletedAt: Date;
}
