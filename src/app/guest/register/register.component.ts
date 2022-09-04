import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User;
  faUser = faUserCircle;
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.username) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        if (err?.status === 409) {
          this.errorMessage = 'Username already exist.';
        } else {
          this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
          console.log(err);
        }
      }
    })
  }
}
