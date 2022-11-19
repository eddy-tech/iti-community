import { NotificationService } from './../../services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {

  @Input()
  notifications : AnyNotification

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.notificationService.fetch()
  }

  ListNotifications(){
  }

}
