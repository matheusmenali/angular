import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { BalancedBracketsComponent } from './components/balanced-brackets/balanced-brackets.component';
import { ServicesModule } from './services/services.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    BalancedBracketsComponent,
    PersonListComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServicesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
