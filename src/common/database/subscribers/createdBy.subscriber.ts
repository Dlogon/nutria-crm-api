import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { BaseModelEntity } from '@common/database/entities';
import { UserService } from '@app/user/user.service';
import { BaseCreatedByEntity } from '../entities/base.createdBy.entity';

@EventSubscriber()
export class CreatedBySubscriber implements EntitySubscriberInterface<BaseCreatedByEntity> {
  constructor(
    private currentUserSvc: UserService,
    private connection: DataSource,
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return BaseCreatedByEntity;
  }
  beforeInsert(event: InsertEvent<any>) {
    const currentUser = this.currentUserSvc.getUsername();
    event.entity.user = currentUser.sub;
  }
}
