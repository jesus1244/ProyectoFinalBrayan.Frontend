export interface user{
    id:         string;
    user:       string;
    password:   string;
    username:   string,
}

export interface login{
    email:       string;
    password:   string;
}

export interface HealthData {
    Age: number;
    Sex_Male: number;
    Cholesterol: number;
    SystolicPressure: number;
    DiastolicPressure: number;
    HeartRate: number;
    Diabetes_Si: number;
    FamilyHistory_Si: number;
    Smoking_Si: number;
    Obesity_Si: number;
    AlcoholConsumption_Moderate: number;
    ExerciseHoursPerWeek: number;
    Diet_Balanced: number;
    PreviousHeartProblems_Si: number;
    MedicationUse_No: number;
    StressLevel_Low: number;
    SedentaryHoursPerDay: number;
    Income: number;
    BMI: number;
    Triglycerides: number;
    PhysicalActivityDaysPerWeek: number;
    SleepHoursPerDay: number;
    Country_YourCountry: number;
    Continent_YourContinent: number;
    Hemisphere_North: number;
  }

export interface response_obtener_prediccion{
    other_info: string;
    probability: number;
    transaction_id: string;
}