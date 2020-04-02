import { NgModule } from '@angular/core';


import { WeatherService } from './weather.service';
import { ContactService } from './contact.service';
import { PersonService } from './person.service';

@NgModule({})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        { provide: 'weatherService', useClass: WeatherService },
        { provide: 'personService', useClass: PersonService },
        { provide: 'contactService', useClass: ContactService }
      ],
    };
  }
}
