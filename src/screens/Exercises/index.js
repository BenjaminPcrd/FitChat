import React, {Component} from 'react';

import {
  Container,
  Text
} from 'native-base';

import firebase from 'react-native-firebase';

export default class Exercise extends Component {

  async componentDidMount() {
    firebase.auth().signInAnonymously()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
        <Text>Exercises</Text>
      </Container>
    );
  }
}
