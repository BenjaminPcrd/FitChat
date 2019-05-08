import GoogleFit, { Scopes } from 'react-native-google-fit'
/*
Scopes.FITNESS_ACTIVITY_READ,
Scopes.FITNESS_ACTIVITY_READ_WRITE,
Scopes.FITNESS_LOCATION_READ,
Scopes.FITNESS_LOCATION_READ_WRITE,
Scopes.FITNESS_BODY_READ,
Scopes.FITNESS_BODY_READ_WRITE,
Scopes.FITNESS_NUTRITION_READ,
Scopes.FITNESS_NUTRITION_READ_WRITE,
Scopes.FITNESS_BLOOD_PRESSURE_READ,
Scopes.FITNESS_BLOOD_PRESSURE_READ_WRITE,
Scopes.FITNESS_BLOOD_GLUCOSE_READ,
Scopes.FITNESS_BLOOD_GLUCOSE_READ_WRITE,
Scopes.FITNESS_OXYGEN_SATURATION_READ,
Scopes.FITNESS_OXYGEN_SATURATION_READ_WRITE,
Scopes.FITNESS_BODY_TEMPERATURE_READ,
Scopes.FITNESS_BODY_TEMPERATURE_READ_WRITE,
Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ_WRITE
*/
export function getAuth() {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_LOCATION_READ,
    ],
  }
  GoogleFit.authorize(options)
   .then(() => {
     console.log("AUTH_SUCCESS")
   })
   .catch(() => {
     console.log("AUTH_ERROR")
   })
}

export function getPeriodStepCount(start, end, i, callback) {
  const opt = {
    startDate: start,
    endDate: end
  };

  /*GoogleFit.getDailyStepCountSamples(opt, (err, res) => {
    if(err) {
      callback(err, 0)
    } else (
      callback(false, res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps)
    )
  })*/

  GoogleFit.getDailyStepCountSamples(opt).then((res) => {
    callback(false, res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps, i)
  }).catch((err) => {
    callback(err, 0, i)
  })
}

export function getDailyCalorieCount(start, end, callback) {
  const opt = {
    startDate: start,
    endDate: end,
    basalCalculation: false
  };
  GoogleFit.getDailyCalorieSamples(opt, (err, res) => {
    if(err) {
      callback(err, 0)
    } else (
      callback(false, res[0].calorie)
    )
  });
}

export function getDailyDistanceCount(start, end, callback) {
  const opt = {
    startDate: start,
    endDate: end
  };
  GoogleFit.getDailyDistanceSamples(opt, (err, res) => {
    if(err) {
      callback(err, 0)
    } else (
      callback(false, res)
    )
  })
}
