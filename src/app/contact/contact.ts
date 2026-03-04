import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {

  private readonly router = inject(Router);
  private toastr = inject(ToastrService);

  onSubmit(): void {
  this.toastr.success('Votre message a été envoyé avec succès !', 'Succès');

    // Redirection instantanée vers l'accueil
    this.router.navigate(['/']);
  }
    cancel(): void {
  this.router.navigate(['/']);
}

}
