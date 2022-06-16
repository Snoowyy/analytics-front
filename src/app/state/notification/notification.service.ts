import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ID } from '@datorama/akita';
import { NotificationStore } from './notification.store';
import { environment } from 'src/environments/environment';
import { Notification, Insight, SendEmail } from './notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  readonly NOTIFICATIONS = 'get-insights-for-user/';
  readonly SEND_EMAIL_INSIGHT = 'share-insight-by-email/';
  readonly INSIGHT = '/insight/';

  constructor(
    private notificationStore: NotificationStore,
    private httpClient: HttpClient
  ) { }

  public getNotifications(context: string): void {
    const url: string = environment.insightsApi + this.NOTIFICATIONS;
    const params = new HttpParams().set('context', context);
    const entities: { notifications?: Notification[] } = {};

    this.httpClient.get<Notification[]>(url, { params })
      .subscribe((notifications: Notification[]) => {
        entities.notifications = notifications;
        this.notificationStore.set(entities);
      });
  }

  public getArchivedNotifications(): void {
    const url = `${environment.insightsApi}${this.NOTIFICATIONS}?saved=true`;
    const entities: { archived?: Notification[] } = {};

    this.httpClient.get<Notification[]>(url)
      .subscribe((archived: Notification[]) => {
        entities.archived = archived;
        this.notificationStore.set(entities);
      });
  }

  public archive(id: ID, saved: boolean, notifications: Notification[]) {
    const url = `${environment.insightsApi}${this.INSIGHT}${id}/update`;
    const entities: { notifications?: Notification[] } = {};

    this.httpClient.put<boolean>(url, { saved })
      .subscribe(() => {
        entities.notifications = this.updateNotificationList(notifications, id);
        this.notificationStore.set(entities);
      }, error => {

      });
  }

  public delete(id: ID, notifications: Notification[]) {
    const url = `${environment.insightsApi}${this.INSIGHT}${id}/update`;
    const entities: { notifications?: Notification[] } = {};

    this.httpClient.put<boolean>(url, { erased: true })
      .subscribe(() => {
        entities.notifications = this.updateNotificationList(notifications, id);
        this.notificationStore.set(entities);
      }, error => {

      });
  }

  public updateNotificationList(notifications: Notification[], id: ID): Notification[] {
    let i = notifications.length;
    while (i--) {
      let j = notifications[i].insights.length;
      while (j--) {
        if (notifications[i].insights[j].id === id)
          notifications[i].insights.splice(j, 1);
      }
      if (notifications[i].insights.length === 0)
        notifications.splice(i, 1);
    }
    return notifications;
  }

  public post(dataForm: SendEmail): void {
    const url: string = environment.insightsApi + this.SEND_EMAIL_INSIGHT;
    this.httpClient.post<{}>(url, dataForm)
      .subscribe(() => {
        console.log('Envio de email exitoso!!')
      }, error => {
        console.log('Envio de email fallido!!')
      });
  }
}
