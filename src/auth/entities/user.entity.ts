import { IsEmail } from 'class-validator';
import { BaseModelEntity } from 'src/common/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseModelEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  private hash: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  LastName: string;
}
