import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesApi } from '../services/movies-api';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';



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
  private toastr = inject(ToastrService);

  private readonly location = inject(Location);

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
    if (this.movie.rate === undefined || this.movie.rate === null) {
    this.toastr.error('⚠️ La note est obligatoire !', 'Erreur');
    return;
  }
  this.moviesApi.updateMovie(this.movie).subscribe({
    next: () => {
      this.toastr.success('🎉 Film mis à jour avec succès ', 'Succès');
      this.location.back();
    },
    error: () => {
      this.toastr.error('❌ Erreur lors de la mise à jour ', 'Erreur');
    }
  });
}

  cancel(): void {
    this.toastr.info('ℹ️ Aucune modification n’a été enregistrée');
    this.location.back();
  }
}
