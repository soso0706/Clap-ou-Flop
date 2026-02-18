import { Component } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { inject } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';
import { MovieCard } from './movie-card/movie-card';


@Component({
  selector: 'app-home',
  imports: [DatePipe, AsyncPipe, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi)
  movies$: Observable<Movie[]> = this.moviesApi.getMovies()
}
