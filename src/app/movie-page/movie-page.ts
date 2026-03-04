import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, NgIf, UpperCasePipe, Location } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Movie } from '../models/movie';
import { Review } from '../models/review';

import { MoviesApi } from '../services/movies-api';
import { ReviewApi } from '../services/reviews-api';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink, UpperCasePipe],
  templateUrl: './movie-page.html',
  styleUrl: './movie-page.scss',
})
export class MoviePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private moviesApi = inject(MoviesApi);
  private reviewApi = inject(ReviewApi);
  private destroyRef = inject(DestroyRef);
  private location = inject(Location);

  movie?: Movie;
  loading = true;

  reviews: Review[] = [];
  reviewsLoading = true;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!idParam || Number.isNaN(id) || id <= 0) {
      this.loading = false;
      this.router.navigate(['/movies-list']);
      return;
    }

    this.moviesApi
      .getMovie(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (m) => {
          this.movie = m;
          this.loading = false;

          // Charge les avis via ReviewApi
          if (m.id) {
            this.reviewsLoading = true;

            this.reviewApi
              .getReviewsByMovieId(m.id)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe({
                next: (rs) => {
                  this.reviews = rs ?? [];
                  this.reviewsLoading = false;
                },
                error: () => {
                  this.reviews = [];
                  this.reviewsLoading = false;
                },
              });
          } else {
            this.reviews = [];
            this.reviewsLoading = false;
          }
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

  addreview(): void {
    if (!this.movie?.id) return;
    this.router.navigate(['/avis', this.movie.id]);
  }
}