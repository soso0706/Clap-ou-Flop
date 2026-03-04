import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() title!: string;
  currentYear = new Date().getFullYear();

  newsletterLink = 'https://www.cnc.fr/cinema/actualites';
  facebookLink = 'https://facebook.com';
  twitterLink = 'https://twitter.com';
  instagramLink = 'https://instagram.com';
}