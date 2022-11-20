import { NotificationService } from './../../../modules/notification/services/notification.service';
import { AnyNotification } from 'src/modules/notification/notification.model';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  @ViewChild(TemplateRef, {static: false})
  template?: TemplateRef<{}>;

  sub?: Subscription;

  notifications: AnyNotification[]


  showDrawer: boolean = false;
  constructor(private socket: WebsocketConnection, private authStore: AuthenticationStore,
    private notificationStore: NotificationStore, private notificationService: NotificationService,
    private nzNotificationService: NzNotificationService) {
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }
    });

    await this.notificationService.fetch()
    this.notificationStore.value$.subscribe( state => {
      this.notifications = state.notifications;
      document.visibilityState === 'hidden' && this.pushNotification(this.notifications)
    })

  }

  async pushNotification(notification: AnyNotification[]){
    const permission = await this.notificationService.checkNotificationPromise()
    if(permission === 'granted'){
      notification.forEach((notif)=>{
        this.nzNotificationService.template(
         this.template!,
         { nzData: notif,
           nzCloseIcon: notif.payload.user.photoUrl || "https://i.pinimg.com/236x/64/1c/4a/641c4acc7b305df3eb11fc5a8941b0b6.jpg"
         }
        )
       })
    }
  }


  onToggleNotifications(): void {
    this.showDrawer = !this.showDrawer;
    if(!this.showDrawer) this.notificationService.markAsViewed()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
