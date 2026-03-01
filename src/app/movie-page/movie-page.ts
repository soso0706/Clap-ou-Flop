import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Movie } from '../models/movie';
import { MoviesApi } from '../services/movies-api';
import { Location } from '@angular/common';


@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './movie-page.html',
  styleUrl: './movie-page.scss',
})
export class MoviePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private moviesApi = inject(MoviesApi);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);

  movie?: Movie;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moviesApi
      .getMovie(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (m) => {
          this.movie = m;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/movies-list']);
        },
      });
  }

  get imageUrl(): string {
    if (!this.movie?.id) return '/default-movie.jpg';
    return `http://localhost:8080/movies/${this.movie.id}/image`;
  }

  goBack(): void {
    this.location.back();
  }

  edit(): void {
    if (!this.movie?.id) return;
    this.router.navigate(['/update-movie', this.movie.id]);
  }

  delete(): void {
    if (!this.movie?.id) return;
    this.moviesApi
      .deleteMovie(this.movie.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.router.navigate(['/movies-list']));
  }
}