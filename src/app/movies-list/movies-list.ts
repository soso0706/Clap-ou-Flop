import { Component, DestroyRef, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';



@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [NgFor, DatePipe, AsyncPipe, RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList {

  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);

  movies: Movie[] = [];
  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe(movies => this.movies = movies);
}


  private destroyRef = inject(DestroyRef)    
  deleteMovie(id: number): void {
    this.moviesApi.deleteMovie(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => 
        this.movies = this.movies.filter(film => film.id !== id)
    );
}

 updateMovie(id: number): void {
    this.router.navigate(['/update-movie', id]);
  }


}
