import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Right,
  Body,
  Title,
  Text
} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderBar extends Component {
  _showRightButton() {
    if(this.props.onRightButton) {
      return (
        <Button transparent onPress={this.props.onRightButton}>
          <Title style={{marginRight: 10, fontSize: 15}}>{this.props.rightLabel}</Title>
          <Icon name={'md-calendar'} size={35} color={'white'} />
        </Button>
      );
    }
  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onLeftButton}>
            <Icon name={'md-menu'} size={35} color={'white'} />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          {this._showRightButton()}
        </Right>
      </Header>
    );
  }
}
