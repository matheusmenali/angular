import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { BalancedBracketsComponent } from './components/balanced-brackets/balanced-brackets.component';

export const routes: Routes = [

  {
    path: '',
    component: WeatherComponent
  },
  {
    path: 'balanced',
    component: BalancedBracketsComponent
  },
  {
    path: 'person',
    component: PersonListComponent
  },
  {
    path: 'contact/:id_person',
    component: ContactListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 

export class AppRoutingModule { }
