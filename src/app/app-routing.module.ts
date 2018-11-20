import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'client/:id', component: ClientDetailComponent },
  { path: 'client/add', component: AddClientComponent },
  { path: 'client/edit/:id', component: EditClientComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
