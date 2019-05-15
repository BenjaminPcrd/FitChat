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

import Tts from 'react-native-tts';

const COACH = {
  _id: 2,
  name: "React Native",
  avatar: "https://placeimg.com/140/140/any"
}

export default class VoiceBot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        _id: 1,
        text: "Hello, I'am your coach bot. Say something!",
        createdAt: new Date(),
        user: COACH
      }],
      isListenerActive: false
    };
  }


  componentDidMount() {
    Dialogflow.setConfiguration( //V1 configuration (for "Listening")
      "753f8f35601f48a6a558e80cc4b2edde",
      Dialogflow.LANG_ENGLISH,
    );

    /*Dialogflow_V2.setConfiguration( //V2 configuration (for text query)
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    );*/

    /*Dialogflow_V2.onListeningStarted(() => console.log("listening started")); //listeners (for android)
    Dialogflow_V2.onListeningCanceled(() => console.log("listening canceled"));
    Dialogflow_V2.onListeningFinished(() => console.log("listening finished"));
    Dialogflow_V2.onAudioLevel(level => console.log(level));*/

    /*Dialogflow.onListeningStarted(() => console.log("listening started")); //listeners (for android)
    Dialogflow.onListeningCanceled(() => console.log("listening canceled"));
    Dialogflow.onListeningFinished(() => console.log("listening finished"));
    Dialogflow.onAudioLevel(level => console.log(level));*/

    Tts.addEventListener('tts-finish', (event) => { //start a new Listening when speech end
      this._startListening()
    });
  }

  _sendBotMessage(text) { //send a bot response
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

  _sendUserMessage(text) { //send a user message (when "Listening")
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

  _speak(text) {
    Tts.getInitStatus().then(() => {
      Tts.speak(text);
    });
  }

  _onSend(messages = []) { //when user type and send a message
    console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow.requestQuery(
      message,
      result => {
        this._sendBotMessage(result.result.fulfillment.speech)
        this._speak(result.result.fulfillment.speech)
        /*this._sendBotMessage(result.queryResult.fulfillmentMessages[0].text.text[0])
        this._speak(result.queryResult.fulfillmentMessages[0].text.text[0])*/
        //Dialogflow.subscription.remove();
      },
      error => console.log(error)
    );
  }

  _startListening() { //start the "Listening" action
    if(this.state.isListenerActive) {
      Dialogflow.finishListening()
      Dialogflow.subscription.remove();
    }
    this.setState({isListenerActive: true})
    Dialogflow.startListening(
      result => {
        this._sendUserMessage(result.result.resolvedQuery)
        this._sendBotMessage(result.result.fulfillment.speech)
        this._speak(result.result.fulfillment.speech)
        Dialogflow.subscription.remove();
        this.setState({isListenerActive: false})
      },
      error => {
        console.log(error)
      }
    )
  }

  _renderActions(props) { //mic button render
    return (
      <Button
        onPress={() => {
          props.context._startListening()
        }}
        transparent>
        <Icon name="microphone" size={30} color={"black"} style={{marginLeft: 10}}/>
      </Button>
    );
  }

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
