import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { BaseModelEntity } from '@common/database/entities';
import { UserService } from '@app/user/user.service';

@EventSubscriber()
export class CreatedBySubscriber implements EntitySubscriberInterface<BaseModelEntity> {
  constructor(
    private currentUserSvc: UserService,
    private connection: DataSource,
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return BaseModelEntity;
  }
  beforeInsert(event: InsertEvent<any>) {
    const currentUser = this.currentUserSvc.getUsername();
    event.entity.userId = currentUser.sub;
  }
}
