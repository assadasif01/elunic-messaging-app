import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'messages', component: MessagesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
