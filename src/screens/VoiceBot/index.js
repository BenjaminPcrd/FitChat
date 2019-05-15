import React, { Component } from 'react';
import {
  Container,
  Text,
  Button
} from 'native-base';
import HeaderBar from '../../components/HeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GiftedChat } from 'react-native-gifted-chat';
import Dialogflow, { Dialogflow_V2 } from 'react-native-dialogflow';
import auth from './auth.json';

const COACH = {
  _id: 2,
  name: "React Native",
  avatar: "https://placeimg.com/140/140/any"
}

export default class VoiceBot extends Component {
  state = {
    messages: [{
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: COACH
    }]
  };

  componentDidMount() {
    Dialogflow.setConfiguration(
      "753f8f35601f48a6a558e80cc4b2edde",
      Dialogflow.LANG_ENGLISH,
    );

    Dialogflow_V2.setConfiguration(
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    );
    Dialogflow_V2.onListeningStarted(() => console.log("listening started"));
    Dialogflow_V2.onListeningCanceled(() => console.log("listening canceled"));
    Dialogflow_V2.onListeningFinished(() => console.log("listening finished"));
    Dialogflow_V2.onAudioLevel(level => console.log(level));
  }

  _sendBotMessage(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: COACH
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  _sendUserMessage(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: {_id: 1}
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  _onSend(messages = []) {
    console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this._sendBotMessage(result.queryResult.fulfillmentMessages[0].text.text[0]),
      error => console.log(error)
    );
  }

  _renderActions(props) {
    return (
      <Button
        onPress={() => {
          Dialogflow.startListening(
            result => {
              console.log(result)
              props.context._sendUserMessage(result.result.resolvedQuery)
              props.context._sendBotMessage(result.result.fulfillment.speech)
              Dialogflow.subscription.remove(); 
            },
            error => console.log(error)
          )
        }}
        transparent>
        <Icon name="microphone" size={30} color={"black"} style={{marginLeft: 10}}/>
      </Button>
    );
  }
//props.sendBotResponse(result.result.fulfillment.speech)
  render() {
    return (
      <Container>
        <HeaderBar
          title='Voice Bot'
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this._onSend(messages)}
          user={{
            _id: 1
          }}
          renderActions={this._renderActions}
          context={this}
        />
      </Container>
    );
  }
}
