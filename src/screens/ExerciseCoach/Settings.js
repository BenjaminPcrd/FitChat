import React, { Component } from 'react';
import {
  Container,
  Text,
  Button
} from 'native-base';
import HeaderBar from '../../components/HeaderBar';

import Tts from 'react-native-tts';

export default class Settings extends Component {
  render() {
    return (
      <Container>
        <HeaderBar title='Settings' onLeftButton={ () => this.props.navigation.navigate('Coach') } leftIcon="md-arrow-round-back"/>
        <Button onPress={() => Tts.setDefaultRate(1)}><Text>Set</Text></Button>
      </Container>
    );
  }
}
