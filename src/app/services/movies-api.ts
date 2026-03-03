import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { inject } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly httpClient = inject(HttpClient)
  private readonly url = "http://localhost:8080/movies"

  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }

  getMovie(id: number) {
  return this.httpClient.get<Movie>(`http://localhost:8080/movies/${id}`);
}

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(this.url, movie);
}

deleteMovie(id: number): Observable<void> { 
    return this.httpClient.delete<void>(`${this.url}/${id}`);
}

getMovieById(id: number): Observable<Movie> {
  return this.httpClient.get<Movie>(`${this.url}/${id}`);
}

updateMovie(movie: Movie): Observable<Movie> {
  return this.httpClient.put<Movie>(`${this.url}/${movie.id}`, movie);
}

uploadMovieImage(movieId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return this.httpClient.post(
    `http://localhost:8080/movies/${movieId}/image`,
    formData
  );
}
}
