import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client;
  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.client = this.clientService.getEmptyClient();
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (valid) {
      value.id = this.id
      this.clientService.updateClient(value)
        .then(() => {
          this.flashMessages.show('Client updated successfully', {
            cssClass: 'alert-success',
            timeout: 3000
          });
          this.router.navigate(['/client/' + this.id])
        });
    } else {
      this.flashMessages.show('Form data is invalid', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      console.log(value);
    }
  }

}
