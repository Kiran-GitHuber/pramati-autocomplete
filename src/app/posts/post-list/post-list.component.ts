import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  posts: Post[] = [];
  start: string;
  atmost: number;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {

  }

  onSearchChange() {
    this.posts = [];
    if (this.start) {
      this.postsService.getPosts(this.start, this.atmost).subscribe(postData => {
        this.posts = postData.posts;
        console.log(this.posts);
      });
    }
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
