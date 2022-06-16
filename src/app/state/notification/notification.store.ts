import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Notification } from './notification.model';
import { Injectable } from '@angular/core';

export interface NotificationState extends EntityState<Notification[]> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notification' })
export class NotificationStore extends EntityStore<NotificationState, Notification[]> {

  constructor() {
    super();
  }

}
