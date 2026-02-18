import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'movies', component: MoviesList}
];
