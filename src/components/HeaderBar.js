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
        <Button transparent style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}} onPress={this.props.onRightButton}>
          <Title style={{marginLeft: 5, marginRight: 10, fontSize: 13}}>{this.props.rightLabel}</Title>
          <Icon name={'md-calendar'} size={35} color={'white'} style={{marginRight: 5}} />
        </Button>
      );
    }
  }

  _showLeftButton() {
    if(this.props.onLeftButton) {
      return (
        <Button transparent onPress={this.props.onLeftButton}>
          <Icon name={'md-menu'} size={35} color={'white'} />
        </Button>
      );
    }
  }

  render() {
    return (
      <Header>
        <Left>
          {this._showLeftButton()}
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
