import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewApi {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080';

  addReview(review: Review): Observable<Review> {
    return this.httpClient.post<Review>(`${this.baseUrl}/reviews`, review);
  }

  getReviewsByMovieId(movieId: number): Observable<Review[]> {
    return this.httpClient.get<Review[]>(`${this.baseUrl}/movies/${movieId}/reviews`);
  }
}