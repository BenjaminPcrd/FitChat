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

import { GoogleSignin } from 'react-native-google-signin';

const COACH = {
  _id: 2,
  name: "React Native",
  avatar: "https://placeimg.com/140/140/any"
}

export default class ExerciseCoach extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        _id: 1,
        text: "Hello, I'am your coach bot. Say something!",
        createdAt: new Date(),
        user: COACH
      }],
      isMicOn: false,
      isSpeaking: false
    };
  }

  async componentDidMount() {
    await Dialogflow_V2.setConfiguration( //V2 configuration (for text query)
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    );

    Tts.addEventListener('tts-finish', (event) => { //start a new Listening when speech end
      this.setState({isSpeaking: false})
      this._startListening()
    });


    const user = await GoogleSignin.getCurrentUser()
    Dialogflow_V2.requestQuery(
      "set " + user.user.id,
      result => console.log(result),
      error => console.log(error)
    );
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
    if(!this.state.isMicOn) {
      Tts.getInitStatus().then(() => {
        this._stopListening()
        this.setState({isSpeaking: true, isMicOn: false})
        Tts.speak(text);
      });
    }
  }


  _startListening() { //start the "Listening" action
    Voice.onSpeechStart = () => this.setState({isMicOn: true})
    Voice.onSpeechEnd = () => this.setState({isMicOn: false})
    Voice.onSpeechError = (err) => {
      this.setState({isMicOn: false})
      switch(err.error.message.split('/')[0]){ // 6 > No speech input, 7 > No match
        case '6':
          Toast.show({
            text: "Listening canceled, no speech input",
            duration: 2000,
            position: 'top',
            buttonText: "Ok",
            buttonStyle: { backgroundColor: "#5cb85c" }
          })
          break
        case '7':
          Toast.show({
            text: "No match, try to speak more clearly",
            duration: 4000,
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
        async result => {
          let results = result.queryResult.fulfillmentMessages.map(item => item.text.text[0])
          if(results.length == 1) {
            this._speak(results[0])
          }
          for(i = 0; i < results.length; i++) {
            this._sendBotMessage(results[i])
            await new Promise((resolve) => setTimeout(() => resolve(), 2000))
          }
        },
        error => console.log(error)
      );
    }
  }

  _stopListening() {
    Voice.stop((res)=> console.log(res))
  }

  _renderInputToolbar(props) {
    return (
      <Button
        style={{alignSelf: 'center'}}
        onPress={() => {
          if(!props.context.state.isMicOn && !props.context.state.isSpeaking) {
            props.context._startListening()
          } else {
            props.context._stopListening()
          }
        }}
        transparent>
        <Icon name="microphone" size={40} color={props.context.state.isMicOn ? 'red' : 'black'} style={{marginBottom: 15}}/>
      </Button>
    )
  }

  render() {
    return (
      <Container>
        <HeaderBar title='Voice Bot' onLeftButton={ () => console.log("leftButton") }/>
        <Root>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this._onSend(messages)}
            user={{ _id: 1 }}
            renderInputToolbar={this._renderInputToolbar}
            context={this}
          />
        </Root>
      </Container>
    );
  }
}
