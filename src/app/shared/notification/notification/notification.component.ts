import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../notification.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/internal/operators';

export interface Notify {
  action: string;
  msg: string;
}

@Component({
  selector: 'adif-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notificationMsg: Notify;
  clearTimeOut;
  private notifySubcription = Subscription.EMPTY;
  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.notifySubcription = this.notificationService.getNotification().subscribe(notify => {
      this.notificationMsg = notify;
    });
  }

  close() {
    this.resetNotification();
  }

  private resetNotification() {
    this.notificationMsg = null;
    this.notificationService.setNotification(null);
  }

  ngOnDestroy() {
    this.notificationMsg = null;
    this.notifySubcription.unsubscribe();
  }
}
