import { RoomCreateModalComponent } from './../room-create-modal/room-create-modal.component';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  rooms: Room[];

  active: boolean;

  @ViewChild('modal')
  modal : RoomCreateModalComponent;

  constructor(private feedStore: FeedStore, private queries: RoomQueries, private roomSocketService: RoomSocketService,
    private router: Router) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    if(this.rooms.length > 0 && this.feedStore.value.roomId ){
     await this.router.navigate([`/${this.rooms[0].id}`])
    }
    this.rooms.forEach((roomsStorage)=>{
      if(roomsStorage.id) localStorage.setItem('Last_Room', String(roomsStorage.name))
    })

  }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   this.modal.open();
  // }

    goToRoom(room: Room) {
    // TODO naviguer vers app/[id de la room]
    this.router.navigate(['app', room.id])
    // console.log(room.id);

    }
}
