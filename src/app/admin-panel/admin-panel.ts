import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { ReviewApi } from '../services/reviews-api';
import { UsersApi } from '../services/users-api';
import { Movie } from '../models/movie';
import { Review } from '../models/review';
import { User } from '../models/user';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [DecimalPipe],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  private moviesApi = inject(MoviesApi);
  private reviewApi = inject(ReviewApi);
  private usersApi = inject(UsersApi);

  totalMovies = 0;
  averageRate = 0;
  bestMovieTitle = '';
  worstMovieTitle = '';
  latestMovieTitle = '';
  topDirector = '';

  totalUsers = 0;
  totalReviews = 0;

  ngOnInit(): void {
    // 🎬 Films
    this.moviesApi.getMovies().subscribe((movies: Movie[]) => {
      if (!movies || movies.length === 0) return;

      // Total films
      this.totalMovies = movies.length;

      // Note moyenne
      const ratedMovies = movies.filter(m => m.rate !== undefined && m.rate !== null);
      const totalRates = ratedMovies.reduce((sum, m) => sum + (m.rate ?? 0), 0);
      this.averageRate = ratedMovies.length > 0
        ? totalRates / ratedMovies.length
        : 0;

      // Meilleur film
      const sortedByRateDesc = [...ratedMovies].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
      this.bestMovieTitle = sortedByRateDesc[0]?.title ?? '—';

      // Pire film
      const sortedByRateAsc = [...ratedMovies].sort((a, b) => (a.rate ?? 0) - (b.rate ?? 0));
      this.worstMovieTitle = sortedByRateAsc[0]?.title ?? '—';

      // Film le plus récent
      const sortedByDate = [...movies].sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
      this.latestMovieTitle = sortedByDate[0]?.title ?? '—';

      // Réalisateur le plus présent
      const directorCount: { [key: string]: number } = {};
      movies.forEach(movie => {
        if (!movie.director) return;
        directorCount[movie.director] = (directorCount[movie.director] || 0) + 1;
      });

      let max = 0;
      let topDirectorName = '';
      for (const director in directorCount) {
        if (directorCount[director] > max) {
          max = directorCount[director];
          topDirectorName = director;
        }
      }
      this.topDirector = topDirectorName || '—';
    });

    // 👤 Utilisateurs
    this.usersApi.getAllUsers().subscribe((users: User[]) => {
      this.totalUsers = users.length;
    });

    // 📝 Reviews
    this.reviewApi.getAllReviews().subscribe((reviews: Review[]) => {
      this.totalReviews = reviews.length;
    });
  }
}
