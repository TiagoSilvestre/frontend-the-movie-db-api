import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-single',
  templateUrl: './movie-single.component.html',
  styleUrls: ['./movie-single.component.css']
})
export class MovieSingleComponent implements OnInit {
  apiUrl = 'https://backend-the-movie-db.herokuapp.com/api';
  movie;
  initialText = 'Loading...';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const username = params['id'];

      this.getUser(username)
          .subscribe(movie => {
            this.movie = movie;
      });
    });
  }

  getUser(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}`);
  }

}
