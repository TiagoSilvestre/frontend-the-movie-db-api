import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})

export class MoviesListComponent implements OnInit {
  apiUrl = 'https://backend-the-movie-db.herokuapp.com/api';
  movies = [];
  initialText = 'Loading...';
  genreList = [];
  formSearch: FormGroup;
  page = 1;
  btnDisable = true;

  @Input()
  name: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getAllGenres();
    this.createForm();
  }

  createForm() {
    this.formSearch = this.formBuilder.group({nome: ''});
  }


  onSubmit() {
    this.movies = [];
    this.initialText = 'Loading...';
    this.getByTitle(this.formSearch.value.nome);
    this.formSearch.reset({nome: ''});
  }


  getByTitle(name) {
    this.btnDisable = true;
    this.http.get<any>(`${this.apiUrl}/search/movie?search=${name}`).subscribe(data => {
        this.movies = data.results;
        this.initialText = (this.movies && this.movies.length) ? '' : 'No data found';
    });
  }


  getAllGenres() {
    this.http.get<any>(`${this.apiUrl}/genre/movie/list`).subscribe(data => {
        this.genreList = data.genres;
        this.getAllMovies();
    });
  }


  getAllMovies() {
    this.http.get<any>(`${this.apiUrl}/movies?page=${this.page}`).subscribe(data => {
        if (this.page === 1) {
          this.movies = data.results;
        } else {
          let i;
          for (i = 0; i < data.results.length; i++) {
            this.movies.push(data.results[i]);
          }
        }
        this.initialText = '';
        this.btnDisable = false;
    });
  }


  getGenreName(genre_id) {
    let name = '';
    this.genreList.every(function(genre) {
      if (genre_id === genre.id) {
        name = genre.name;
        return false;
      }
      return true;
    });
    return name;
  }

  loadMore() {
    this.page++;
    this.getAllMovies();
  }

  getAll() {
    this.page = 1;
    this.getAllMovies();
  }

}


