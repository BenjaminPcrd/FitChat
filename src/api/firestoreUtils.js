import firebase from 'react-native-firebase';
import { userDBTemplate } from './userDBTemplate'

export function resetFSUser(user) {
  const ref = firebase.firestore().collection('users').doc(user.id)
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(!doc.exists) {
      transaction.set(ref, {
        ...userDBTemplate,
        name: user.givenName,
        userId: user.id,
      })
    } else {
      transaction.update(ref, {
        ...userDBTemplate,
        name: user.givenName,
        userId: user.id,
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

export function setFSUserWeight(user, weight) {
  const ref = firebase.firestore().collection('users').doc(user.id) //update firestore
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(doc.exists) {
      transaction.update(ref, {
        weight: weight
      })
    }
  }).catch(err => console.warn("setFSUserWeight failed", err))
}

export function setFSUserHeight(user, height) {
  const ref = firebase.firestore().collection('users').doc(user.id) //update firestore
  firebase.firestore().runTransaction(async transaction => {
    const doc = await transaction.get(ref)
    if(doc.exists) {
      transaction.update(ref, {
        height: height
      })
    }
  }).catch(err => console.warn("setFSUserHeight failed", err))
}
