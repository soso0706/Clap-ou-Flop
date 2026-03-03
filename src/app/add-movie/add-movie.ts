import { Component, inject } from '@angular/core';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule, CommonModule],
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
  private toastr = inject(ToastrService);
  today = new Date().toISOString().split('T')[0];




  onPosterSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.posterFile = input.files?.[0] ?? null;
  }

addMovie(): void {
  this.moviesApi.addMovie(this.movie).subscribe((createdMovie: Movie) => {
    const id = createdMovie?.id;
    if (this.posterFile && id) {
      // Upload de l'image
      this.moviesApi.uploadMovieImage(id, this.posterFile).subscribe(() => {
        this.toastr.success('✅ Film ajouté avec succès !', 'Succès');
        this.router.navigate(['/movies']);
      }, err => {
        this.toastr.error('⚠️ Le film a été ajouté mais l’image n’a pas pu être uploadée', 'Erreur');
        this.router.navigate(['/movies']);
      });
    } else {
      // Pas d'image, juste naviguer
      this.toastr.success('✅ Film ajouté avec succès !', 'Succès');
      this.router.navigate(['/movies']);
    }
  }, err => {
    this.toastr.error('⚠️ Impossible d’ajouter le film', 'Erreur');
  });
}

  cancel(): void {
  this.router.navigate(['/movies']);
}
}