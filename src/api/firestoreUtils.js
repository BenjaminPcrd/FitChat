import firebase from 'react-native-firebase';

export function resetFSUser(user) {
  const ref = firebase.firestore().collection('users').doc(user.id)
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(!doc.exists) {
      transaction.set(ref, {
        currentExName: "",
        currentStep: 0,
        currentStepEx: 0,
        name: user.givenName,
        dailyStepGoal: 3500,
        userId: user.id,
      })
    } else {
      transaction.update(ref, {
        currentExName: "",
        currentStep: 0,
        currentStepEx: 0,
        name: user.givenName,
      })
    }
  }).catch(err => console.warn("resetFSUser failed", err))
}

export function setFSUserDailyStepGoal(user, goal) {
  const ref = firebase.firestore().collection('users').doc(user.id) //update firestore
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(doc.exists) {
      transaction.update(ref, {
        dailyStepGoal: goal
      })
    }
  }).catch(err => console.warn("setFSUserDailyStepGoal failed", err))
}

export function setFSUserPastWeeksSteps(user, tabStep) {
  const ref = firebase.firestore().collection('users').doc(user.id) //update firestore
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(doc.exists) {
      transaction.update(ref, {
        stepArray: tabStep
      })
    }
  }).catch(err => console.warn("setFSUserPastWeeksSteps failed", err))
}
