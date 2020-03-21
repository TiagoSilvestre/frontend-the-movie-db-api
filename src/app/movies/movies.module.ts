import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviesRoutingModule
  ],
  declarations: [MoviesListComponent, MovieSingleComponent]
})
export class MoviesModule { }
