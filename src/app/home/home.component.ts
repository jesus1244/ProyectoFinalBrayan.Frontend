import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { PagesServiceService } from '../pages-service/pages.service.service';
import { HealthData } from '../Interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule]
})
export class HomeComponent {
  
  healthData: HealthData = {
    Age: 30,
    Sex_Male: 1,
    Cholesterol: 190,
    SystolicPressure: 120,
    DiastolicPressure: 80,
    HeartRate: 120,
    Diabetes_Si: 0,
    FamilyHistory_Si: 0,
    Smoking_Si: 1,
    Obesity_Si: 0,
    AlcoholConsumption_Moderate: 1,
    ExerciseHoursPerWeek: 3,
    Diet_Balanced: 1,
    PreviousHeartProblems_Si: 0,
    MedicationUse_No: 1,
    StressLevel_Low: 1,
    SedentaryHoursPerDay: 8,
    Income: 50000,
    BMI: 10,
    Triglycerides: 150,
    PhysicalActivityDaysPerWeek: 4,
    SleepHoursPerDay: 7,
    Country_YourCountry: 1,
    Continent_YourContinent: 1,
    Hemisphere_North: 1,
  }

  constructor( private pagesService: PagesServiceService, private router: Router ) { }

  sendForm(){

    this.pagesService.predict( this.healthData ).subscribe((data:any) => {
      console.log(data);

      localStorage.setItem('prediction', data.transaction_id);
      this.router.navigate(['/FinalPage']);
    });

  }

}
