import React, { Component } from 'react';
import {
  Container,
  Text,
  Button,
  Toast,
  Root
} from 'native-base';
import HeaderBar from '../../components/HeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import auth from './auth.json';

import Voice from 'react-native-voice';
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
      isListening: false,
      micColor: 'black'
    };
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration( //V2 configuration (for text query)
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    );

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
    if(!this.state.isListening) {
      Tts.getInitStatus().then(() => {
        Tts.speak(text);
      });
    }
  }

  _onSend(messages = []) { //when user type and send a message
    console.log(messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => {
        this._sendBotMessage(result.queryResult.fulfillmentText)
        this._speak(result.queryResult.fulfillmentText)
      },
      error => console.log(error)
    );
  }

  _startListening() { //start the "Listening" action
    console.log(this.props)

    Voice.onSpeechStart = () => this.setState({micColor: 'red', isListening: true})
    Voice.onSpeechEnd = () => this.setState({micColor: 'black', isListening: false})
    Voice.onSpeechError = (err) => {
      this.setState({micColor: 'black', isListening: false})

      switch(err.error.message.split('/')[0]){ // 6 > No speech input, 7 > No match
        case '6':
          Toast.show({
            text: "No speech input, try to speak a little louder and close to the microphone",
            duration: 5000,
            position: 'top',
            buttonText: "Ok",
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
          break
        case '7':
          Toast.show({
            text: "No match, try to speak a little more clearly and slowly",
            duration: 5000,
            position: 'top',
            buttonText: "Ok",
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
          break
      }
    }

    Voice.start('en-US')

    Voice.onSpeechResults = (res) => {
      let speech = res.value[0]
      this._sendUserMessage(speech)
      Dialogflow_V2.requestQuery(
        speech,
        result => {
          this._sendBotMessage(result.queryResult.fulfillmentText)
          this._speak(result.queryResult.fulfillmentText)
        },
        error => console.log(error)
      );
    }
  }

  _renderActions(props) { //mic button render
    return (
      <Button
        onPress={() => {
          if(!props.context.state.isListening) {
            props.context._startListening()
          }
        }}
        transparent>
        <Icon name="microphone" size={30} color={props.context.state.micColor} style={{marginLeft: 10}}/>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <HeaderBar title='Voice Bot'/>
        <Root>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this._onSend(messages)}
            user={{ _id: 1 }}
            renderActions={this._renderActions}
            context={this}
          />
        </Root>
      </Container>
    );
  }
}
