import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    this.authService.isLoggedIn().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
        this.loggedInUser = '';
      }
    });
  }

  onLogoutClick() {
    this.authService.logout()
      .then(() => {
        this.flashMessages.show('You are now logged out', {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(['/login']);
      });
  }
}
