import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import { AddMovie } from './add-movie/add-movie';
import { UpdateMovie } from './update-movie/update-movie';
import { Connexion } from './connexion/connexion';
import { Inscription } from './inscription/inscription';
import { CompteUser } from './compte-user/compte-user';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path: 'add-movie', component: AddMovie},
    { path: 'update-movie/:id', component: UpdateMovie},
    { path: 'connexion', component: Connexion},
    { path: 'inscription', component: Inscription},
    { path: 'compte-user', component: CompteUser}
];
