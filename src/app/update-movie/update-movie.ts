import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-movie',
  imports: [FormsModule, DatePipe],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.scss',
})
export class UpdateMovie {

  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesApi.getMovieById(+id).subscribe(movie => {
        this.movie = movie; // garde le type Date
      });
    }
  }

  save(): void {
    this.moviesApi.updateMovie(this.movie).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
