import React, {Component} from 'react';

import {
  Container
} from 'native-base';

import DFV2 from './DFV2'

export default class VoiceBot extends Component {
  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
      <DFV2 />
      </Container>
    );
  }
}
