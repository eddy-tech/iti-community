import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  get text(){
    return this.post.message.text.content;
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post
    if(!this.post.liked){
      await this.postService.like(this.post)
      this.post.liked = true
      return true
    } else {
      return false
    }
  }
}
