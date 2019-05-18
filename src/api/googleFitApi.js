import GoogleFit, { Scopes } from 'react-native-google-fit'


export function authorize(callback) {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_LOCATION_READ
    ]
  }

  GoogleFit.authorize(options)
    .then(() => callback())
    .catch(() => console.warn("AUTH_ERROR"))
}

export function getPeriodStepCount(start, end) {
  const opt = { startDate: start, endDate: end }
  return new Promise((resolve, reject) => {
    GoogleFit.getDailyStepCountSamples(opt, (err, res) => {
      if(err) {
        reject(err)
      } else {
        resolve(res.filter(obj => obj.source === "com.google.android.gms:estimated_steps")[0].steps)
      }
    })
  })
}

export function getPeriodDistance(start, end) {
  const opt = { startDate: start, endDate: end }
  return new Promise((resolve, reject) => {
    GoogleFit.getDailyDistanceSamples(opt, (err, res) => {
      if(err) {
        resject(error)
      } else {
        resolve(res)
      }
    })
  })
}

export function getPeriodCalorie(start, end) {
  const opt = { startDate: start, endDate: end, basalCalculation: false }
  return new Promise((resolve, reject) => {
    GoogleFit.getDailyCalorieSamples(opt, (err, res) => {
      if(err) {
        resject(error)
      } else {
        resolve(res[0].calorie)
      }
    })
  })
}
