import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title
} from "native-base";
//import DayStartStop from './DayStartStop'

export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
             <Title>Settings</Title>
          </Body>
        </Header>

      </Container>
    );
  }
}
//<DayStartStop />
