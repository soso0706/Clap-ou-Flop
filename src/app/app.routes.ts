import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesList } from './movies-list/movies-list';
import { AddMovie } from './add-movie/add-movie';
import { UpdateMovie } from './update-movie/update-movie';
import { MoviePage } from './movie-page/movie-page';
import { Contact } from './contact/contact';
import { MiniGame } from './mini-game/mini-game';


export const routes: Routes = [
    { path: '', component: Home},
    { path: 'movies', component: MoviesList},
    { path: 'add-movie', component: AddMovie},
    { path: 'update-movie/:id', component: UpdateMovie},
    { path: 'contact', component: Contact},
    { path: 'movies/:id', component: MoviePage },
    { path: 'mini-game', component: MiniGame }
];
