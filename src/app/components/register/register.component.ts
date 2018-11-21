import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(auth => {
        this.flashMessages.show('You are now regestered and logged in', {
          cssClass: 'alert-success',
          timeout: 6000
        });
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      });
  }

}
