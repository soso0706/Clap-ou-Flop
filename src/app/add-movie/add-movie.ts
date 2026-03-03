import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { FormsModule } from '@angular/forms';
import { MoviesApi } from '../services/movies-api';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
}


 addMovie(): void {
    this.moviesApi.addMovie(this.movie).subscribe(
        () => 
          {
          this.toastr.success('✅ Film ajouté avec succès ! ', 'Succès');
          this.router.navigate(['/movies']);
        }
    );
 }

  private readonly moviesApi = inject(MoviesApi);
  private readonly router = inject(Router);
  private toastr = inject(ToastrService);
  today = new Date().toISOString().split('T')[0];



}




