import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieSingleComponent } from './movie-single/movie-single.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent
  },
  {
    path: ':id',
    component: MovieSingleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
