import { Component, DestroyRef, inject } from '@angular/core';
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

  movie?: Movie; // juste pour afficher le titre 

  review: Review = {
    rate: 5,
    text: '',

    user: { id: 3 } as User,

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

    this.review.user = { id: 3 } as User;

    this.reviewApi.addReview(this.review).subscribe({
      next: () => {
        this.toastr.success('🎉 Avis ajouté', 'Succès');
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