import React, { Component } from 'react';
import {
  Container,
  Text,
  Button,
  Toast,
  Root
} from 'native-base';
import { View, TouchableOpacity } from 'react-native'
import HeaderBar from '../../components/HeaderBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GiftedChat, Bubble, utils } from 'react-native-gifted-chat';
const { isSameUser } = utils;
import { Dialogflow_V2 } from 'react-native-dialogflow';
import auth from './auth.json';

import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

import { connect } from 'react-redux';

const icon = require("../../assets/chaticon.png")
const COACH = {
  _id: 2,
  name: "Exercise Coach",
  avatar: icon
}

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

class FitchatBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      isMicOn: false,
      isSpeaking: false
    };
  }

  async componentDidMount() {
    Tts.addEventListener('tts-finish', this._handleTtsListener);

    await Dialogflow_V2.setConfiguration( //V2 configuration
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    )

    Dialogflow_V2.requestQuery( //sending the current user id to the bot
      "set " + this.props.user.id,
      result => this._sendBotMessage(result.queryResult.fulfillmentMessages[0].text.text),
      error => console.log(error)
    );
  }

  _handleTtsListener = (event) => {
    if(this.isStateActive) {
      this.setState({isSpeaking: false})
      this._startListening()
    }
  };

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
      user: { _id: 1, name: this.props.user.givenName, avatar: this.props.user.photo }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  _speak(text) { //speak using tts
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
          if(results.length == 1) { //speak all the time
            this._speak(results[0])
          }
          for(i = 0; i < results.length; i++) {
            this._sendBotMessage(results[i])
            await new Promise((resolve) => setTimeout(() => resolve(), 1000))
          }
        },
        error => console.log(error)
      );

    }
  }

  _stopListening() { //cancel a started listening
    Voice.stop((res)=> console.log(res))
  }

  _renderInputToolbar(props) { //mic button render
    return (
      <Button
        style={{alignSelf: 'center'}}
        onPress={() => {
          if(!props.context.state.isMicOn && !props.context.state.isSpeaking) { //if isMicOn => stfu
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

  renderBubble(props) {
    let time = props.currentMessage.createdAt.getHours().pad(2) + ":" + props.currentMessage.createdAt.getMinutes().pad(2)
    const msgHeader = isSameUser(props.currentMessage, props.previousMessage) ? null : (
      <Text
        style={{
          fontSize: 15,
          color: 'grey',
          marginLeft: props.currentMessage.user._id == 2 ? 10 : 0,
          marginRight: props.currentMessage.user._id == 2 ? 0 : 10,
          alignSelf: props.currentMessage.user._id == 2 ? 'flex-start' : 'flex-end'}}
      >
        {props.currentMessage.user._id == 2 ? '' : time + " - "}
        {props.currentMessage.user.name}
        {props.currentMessage.user._id == 2 ? " - " + time : ''}
      </Text>
    )

    return (
      <View>
        {msgHeader}
        <Bubble {...props}  />
      </View>
    );
  }

  render() { //add logout button
    this.isStateActive = true
    return (
      <Container>
        <HeaderBar
          title='Fitchat Bot'
          onLeftButton={() => {
            console.log("button")
          }}
          leftIcon="md-menu"/>
        <Root>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this._onSend(messages)}
            user={{ _id: 1, name: this.props.user.givenName, avatar: this.props.user.photo }}
            renderInputToolbar={this._renderInputToolbar}
            context={this}
            renderTime={() => null}
            renderBubble={this.renderBubble}
          />
        </Root>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.setUser.user
  }
}

export default connect(mapStateToProps)(FitchatBot)
