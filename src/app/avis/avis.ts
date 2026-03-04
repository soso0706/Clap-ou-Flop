import { Component, DestroyRef, inject, untracked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';

import { MoviesApi } from '../services/movies-api';
import { ReviewApi } from '../services/reviews-api';
import { Movie } from '../models/movie';
import { Review } from '../models/review';
import { User } from '../models/user';
import { UsersApi } from '../services/users-api';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './avis.html',
  styleUrl: './avis.scss',
})
export class AddReview {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly toastr = inject(ToastrService);
  private readonly moviesApi = inject(MoviesApi);
  private readonly reviewApi = inject(ReviewApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly userApi = inject(UsersApi)

  movie?: Movie; // juste pour afficher le titre 

  currentUser:User={
    firstName:'',
    lastName:'',
    age:0,
    email:'',
    points:0
  };


  review: Review = {
    rate: 5,
    text: '',
    user: this.currentUser,
    movie: undefined,
  };

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    if (!movieId) {
      this.toastr.error('Film introuvable', 'Erreur');
      this.router.navigate(['/movies-list']);
      return;
    }

    this.review.movie = { id: movieId } as Movie;

    this.moviesApi.getMovie(movieId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (m) => (this.movie = m),
        error: () => { }
      });
    
    this.userApi.getByEmail('alainposteur@outlook.com').subscribe({
      next: (u) => {
        this.review.user = u;
      },
      error: (e) => console.error(e)
    });

  }

  save(): void {
    if (!this.review.movie?.id) {
      this.toastr.error('Film introuvable', 'Erreur');
      return;
    }
    if (!this.review.text.trim()) {
      this.toastr.warning('Commentaire obligatoire');
      return;
    }

    console.log("ADD REVIEW")

    this.reviewApi.addReview(this.review).subscribe({
      next: () => {
        this.toastr.success('🎉 Avis ajouté', 'Succès');
        this.userApi.changePoint(this.review.user).subscribe();
        this.location.back();
      },
      error: () => {
        this.toastr.error('❌ Erreur lors de l’ajout', 'Erreur');
      },
    });
  }

  cancel(): void {
    this.toastr.info('ℹ️ Aucun avis n’a été enregistré');
    this.location.back();
  }
}