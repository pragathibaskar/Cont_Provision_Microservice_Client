import { Injectable } from '@angular/core';
import { Notify } from './notification/notification.component';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification: Notify;
  private notificationSubject = new BehaviorSubject<Notify>(null);
  routerUrl: string;
  constructor() { }

  setNotification(msg: Notify) {
    this.notificationSubject.next(msg);
  }

  getNotification(): Observable<Notify> {
    return this.notificationSubject.asObservable();
  }
}
