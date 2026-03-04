import { Component, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { DecimalPipe} from '@angular/common';



@Component({
  selector: 'app-admin-panel',
  imports: [DecimalPipe],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  private moviesApi = inject(MoviesApi);

  totalMovies = 0;
  averageRate = 0;

  bestMovieTitle = '';
  worstMovieTitle = '';
  latestMovieTitle = '';
  topDirector = '';

  ngOnInit(): void {
    this.moviesApi.getMovies().subscribe((movies: Movie[]) => {

      if (!movies || movies.length === 0) return;

      // 1️⃣ Total
      this.totalMovies = movies.length;

      // 2️⃣ Moyenne des notes
      const ratedMovies = movies.filter(m => m.rate !== undefined && m.rate !== null);
      const totalRates = ratedMovies.reduce((sum, m) => sum + (m.rate ?? 0), 0);
      this.averageRate = ratedMovies.length > 0
        ? totalRates / ratedMovies.length
        : 0;

      // 3️⃣ Meilleur film
      const sortedByRateDesc = [...ratedMovies].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
      this.bestMovieTitle = sortedByRateDesc[0]?.title ?? '—';

      // 4️⃣ Pire film
      const sortedByRateAsc = [...ratedMovies].sort((a, b) => (a.rate ?? 0) - (b.rate ?? 0));
      this.worstMovieTitle = sortedByRateAsc[0]?.title ?? '—';

      // 5️⃣ Film le plus récent (par date de sortie)
      const sortedByDate = [...movies].sort(
        (a, b) =>
          new Date(b.releaseDate).getTime() -
          new Date(a.releaseDate).getTime()
      );
      this.latestMovieTitle = sortedByDate[0]?.title ?? '—';

      // 6️⃣ Réalisateur le plus présent
      const directorCount: { [key: string]: number } = {};

      movies.forEach(movie => {
        if (!movie.director) return;
        directorCount[movie.director] =
          (directorCount[movie.director] || 0) + 1;
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
  }
}
