import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number
  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.totalOwed = this.getTotalOwed();
    })
  }

  getTotalOwed() {
    return this.clients.reduce((sum, client) => sum + client.balance, 0);
  }

}
