import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Home } from './home/home';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Home, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Clap ou Flop');
}
