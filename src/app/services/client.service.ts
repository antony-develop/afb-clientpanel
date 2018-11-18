import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Client } from "../models/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>
  client: Observable<Client>

  constructor(private angularFireStore: AngularFirestore) {
    this.clientsCollection = this.angularFireStore.collection('clients', ref => {
      return ref.orderBy('lastName');
    })
   }

   getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return this.clients;
   }

   getEmptyClient(): Client {
    return {
      fistName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    }
   }

   addClient(client: Client) {
     this.clientsCollection.add(client);
   }
}
