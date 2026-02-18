import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [NgFor, DatePipe, AsyncPipe],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList {

  private readonly moviesApi = inject(MoviesApi);

  movies$: Observable<Movie[]> = this.moviesApi.getMovies();

}
