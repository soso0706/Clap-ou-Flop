import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
@Input({ required: true }) title! : string

isOpen = false;

toggleMenu() {
  this.isOpen = !this.isOpen;
}

closeMenu() {
  this.isOpen = false;
}
}
