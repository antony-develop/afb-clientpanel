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

   getClient(id: string): Observable<Client> {
    this.clientDoc = this.angularFireStore.doc<Client>('clients/' + id);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists) {
          const data = actions.payload.data() as Client;
          const id = actions.payload.id;
          return { id, ...data };
        } else {
          return null;
        }        
      })
    );

    return this.client;
   }

   updateClient(client: Client) {
    this.clientDoc = this.angularFireStore.doc<Client>('clients/'+client.id);
    return this.clientDoc.update(client);
   }

   deleteClient(id: string) {
     this.clientDoc = this.angularFireStore.doc<Client>('clients/' + id);
     return this.clientDoc.delete();
   }
}
