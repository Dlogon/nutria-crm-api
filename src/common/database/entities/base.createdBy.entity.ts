import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { createdBy } from './createdBy';
import { User } from '@app/auth/entities/user.entity';
import { BaseModelEntity } from './base.entity';
/**
 * @description Base model for entities
 * class with id, createdAt and updatedAt columns
 */
@Entity()
export abstract class BaseCreatedByEntity extends BaseModelEntity implements createdBy {
  @OneToOne(() => User, {})
  @JoinColumn()
  user: number;
}
