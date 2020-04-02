import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherForm: FormGroup;
  public weatherFormFields = {
    city: ['', Validators.required],
  };
  public dataTime = {};

  constructor(
    private fb: FormBuilder,
    @Inject('weatherService') private weatherService
  ) { 
    this.weatherForm = this.fb.group(this.weatherFormFields);
  }

  ngOnInit() {
  }

  searchCity(){
    const a = this.weatherForm.get('city').value;
    this.weatherService.getWeatherLocation(this.weatherForm.get('city').value).subscribe(
      response => {
        this.dataTime = response.weather[0];
      }
    );
  }

}
