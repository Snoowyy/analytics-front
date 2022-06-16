import { QueryEntity } from '@datorama/akita';
import { NotificationStore, NotificationState } from './notification.store';
import { Notification, Insight } from './notification.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NotificationQuery extends QueryEntity<NotificationState, Notification[]> {

  constructor(protected store: NotificationStore) {
    super(store);
  }

  get() {
    return this.selectEntity('notifications')
      .pipe(
        map((notifications: Notification[]) => {
          if (notifications) {
            notifications.forEach(nf =>
              nf.insights.forEach(ins => ins.checked = false)
            );
          }
          return notifications || [];
        })
      );
  }

  getArchived() {
    return this.selectEntity('archived')
      .pipe(
        map((notifications: Notification[]) => {
          if (notifications) {
            notifications.forEach(nf =>
              nf.insights.forEach(ins => ins.checked = false)
            );
          }
          return notifications || [];
        })
      );
  }
}
