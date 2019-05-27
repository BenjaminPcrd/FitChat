import React, {Component} from 'react';
import AppContainer from './navigation/AppContainer'
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux'

import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';

const slides = [
  {
    key: '1',
    title: 'Exercise Coach',
    text: 'Description Exercise Coach',
    image: null, //require('./assets/toto.jpeg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    title: 'Traxivity',
    text: 'Description Traxivity',
    image: null,
    backgroundColor: '#febe29',
  }
];

class App extends Component {
  async componentDidMount() {
    const isSignedIn = await GoogleSignin.isSignedIn()
    if(!this.props.isFirstLaunch && !isSignedIn) {
      this._onDone()
    }
  }

  async _onDone() {
    await GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/fitness.location.read",
        "https://www.googleapis.com/auth/fitness.activity.read"
      ],
      webClientId: '97311447993-a0gm2t557t128fdnqib8bcp8ooe9m7h6.apps.googleusercontent.com'
    })

    const user = await GoogleSignin.signIn()
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, 'xoY16mVZdhjfiGCho6E66jAN')
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)

    this.props.dispatch({ type: "SET_IS_FIRST_LAUNCH", value: false })
    this.props.dispatch({ type: "SET_NEW_USER", value: user.user })
  }

  render() {
    if(!this.props.isFirstLaunch) {
      return <AppContainer />
    } else {
      return <AppIntroSlider slides={slides} onDone={() => this._onDone()}/>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isFirstLaunch: state.setIsFirstLaunch.isFirstLaunch,
    user: state.setUser.user
  }
}

export default connect(mapStateToProps)(App)
