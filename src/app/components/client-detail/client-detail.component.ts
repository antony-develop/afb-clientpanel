import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ClientService } from "src/app/services/client.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  id: string;
  client: Client;
  showBalanceUpdateImput: boolean;

  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private rout: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.id = this.rout.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      console.log(this.client);
    })
  }

}
