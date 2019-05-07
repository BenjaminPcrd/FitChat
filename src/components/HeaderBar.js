import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Title
} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderBar extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button onPress={this.props.onClick}>
            <Icon name={this.props.icon == 'back' ? 'md-arrow-round-back' : 'md-menu'} size={35} color={'white'} />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
    );
  }
}
