import React, { Component } from 'react';
import {
  Container,
  Text
} from 'native-base';
import HeaderBar from '../../components/HeaderBar';

export default class FitchatBot extends Component {
  render() {
    return (
      <Container>
        <HeaderBar title='Fitchat Bot' onLeftButton={ () => console.log("onLeftButton") } leftIcon="md-menu"/>
      </Container>
    );
  }
}
