import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject} from 'rxjs';

import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {
  }

  getPosts(start?, atmost?) {
    let params: HttpParams = new HttpParams();
    if (start) {
      params = params.append('start', start);
    }
    if (atmost) {
      params = params.append('atmost', atmost);
    }
    return this.http
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/suggest_cities', {params}
      );
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
