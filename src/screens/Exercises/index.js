import React, {Component} from 'react';

import {
  Container,
  Text
} from 'native-base';

export default class Exercise extends Component {

  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
        <Text>Exercises</Text>
      </Container>
    );
  }
}
