import { Component, ElementRef, HostListener, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input({ required: true }) title!: string;

  private readonly router = inject(Router);
  private readonly moviesApi = inject(MoviesApi);
  private readonly elRef = inject(ElementRef);

  isOpen = false;

  // 🔎 Search
  searchCtrl = new FormControl('', { nonNullable: true });
  showSuggestions = false;

  private movies$: Observable<Movie[]> = this.moviesApi.getMovies();

  filteredMovies$: Observable<Movie[]> = combineLatest([
    this.movies$,
    this.searchCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      distinctUntilChanged(),
      map(v => v.trim().toLowerCase())
    ),
  ]).pipe(
    map(([movies, q]) => {
      if (!q) return [];
      return movies
        .filter(m =>
          (m.title ?? '').toLowerCase().includes(q) ||
          (m.director ?? '').toLowerCase().includes(q)
        )
        .slice(0, 6);
    })
  );

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  onFocusSearch() {
    this.showSuggestions = true;
    this.closeMenu();
  }

  selectMovie(movie: Movie) {
    this.showSuggestions = false;
    this.searchCtrl.setValue('');
    this.router.navigate(['/movies', movie.id]);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) this.showSuggestions = false;
  }
}