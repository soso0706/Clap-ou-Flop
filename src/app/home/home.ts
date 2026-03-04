import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { Observable, map, shareReplay } from 'rxjs';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { MovieCard } from './movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, MovieCard, NgIf, NgForOf],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly moviesApi = inject(MoviesApi);

  movies$: Observable<Movie[]> = this.moviesApi.getMovies().pipe(shareReplay(1));

  nouveautes$ = this.movies$.pipe(
    map(movies =>
      [...movies].sort((a, b) =>
        new Date(b.releaseDate as any).getTime() - new Date(a.releaseDate as any).getTime()
      )
    )
  );

  coupsDeCoeur$ = this.movies$.pipe(
    map(movies =>
      [...movies].sort((a, b) => (b.rate ?? -Infinity) - (a.rate ?? -Infinity))
    )
  );

  @ViewChild('scrollNew') scrollNew!: ElementRef<HTMLElement>;
  @ViewChild('scrollFav') scrollFav!: ElementRef<HTMLElement>;

  scrollLeft(ref: ElementRef<HTMLElement>) {
    ref.nativeElement.scrollBy({ left: -600, behavior: 'smooth' });
  }
  scrollRight(ref: ElementRef<HTMLElement>) {
    ref.nativeElement.scrollBy({ left: 600, behavior: 'smooth' });
  }

  trackById(_index: number, item: Movie) {
    return item.id;
  }
}