import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Post } from './shared/posts.model';

// type PostData = {
//   title: string;
//   content: string;
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  // { title: string; content: string }
  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    //kako tip se stava responsot
    this.http.post<{name: string}>('https://recipes-project-2995d-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseData => console.log(responseData));
  }

  onFetchPosts() {
    this.http.get<{[key:string]: Post}>('https://recipes-project-2995d-default-rtdb.firebaseio.com/posts.json')
    .pipe(map((responseData: {[key:string]: Post}) => {
      const postsArray: Post[] = [];
      for(const key in responseData) {
        const value = responseData[key];
        postsArray.push({...value, id: key});
      }
      return postsArray;
    }))
    .subscribe(
      posts => this.loadedPosts = posts
    );
  }

  onClearPosts() {
    // Send Http request
  }
   
}
