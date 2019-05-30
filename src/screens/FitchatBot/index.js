import React, { Component } from 'react';
import {
  Container,
  Text
} from 'native-base';
import HeaderBar from '../../components/HeaderBar';

export default class Index extends Component {
  render() {
    return (
      <Container>
        <HeaderBar
          title='Fitchat Bot'
          onLeftButton={() => {
            console.log("button")
          }}
          leftIcon="md-menu"/>
        <Container style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Not implemented yet</Text>
        </Container>
      </Container>
    );
  }
}
