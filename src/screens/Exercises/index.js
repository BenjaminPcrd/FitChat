import React, {Component} from 'react';

import {
  Container
} from 'native-base';

import DFV1 from './DFV1'

export default class Exercise extends Component {
  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
        <DFV1 />
      </Container>
    );
  }
}
