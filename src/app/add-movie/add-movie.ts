import { Component, inject } from '@angular/core';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  };

  private posterFile: File | null = null;

  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);

  onPosterSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.posterFile = input.files?.[0] ?? null;
  }

  addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe((createdMovie: Movie) => {
      const id = createdMovie?.id;

      if (!this.posterFile || !id) {
        this.router.navigate(['/movies']);
        return;
      }

      this.moviesApi.uploadMovieImage(id, this.posterFile).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    });
  }
}