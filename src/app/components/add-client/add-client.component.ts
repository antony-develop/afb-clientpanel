import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  client: Client
  disableBalanceOnAdd: boolean = true;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.client = this.clientService.getEmptyClient();
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (valid) {
      // console.log('valid');
      this.flashMessages.show('New client added successfully', {
        cssClass: 'alert-success',
        timeout: 3000
      });
      this.clientService.addClient(value);
      this.router.navigate(['/']);
    } else {
      // console.log('invalid')
      this.flashMessages.show('Form data is invalid', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    }
  }

}
