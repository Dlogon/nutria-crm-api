import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { createdBy } from './createdBy';
import { User } from '@app/auth/entities/user.entity';
/**
 * @description Base model for entities
 * class with id, createdAt and updatedAt columns
 */
@Entity()
export abstract class BaseModelEntity implements createdBy {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ type: 'datetime', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  @OneToOne(() => User, {})
  @JoinColumn()
  user: number;
}
