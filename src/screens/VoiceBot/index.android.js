import React, {Component} from 'react';

import {
  Container,
  Text,
  Button,
  Form,
  Item,
  Input
} from 'native-base';

import Dialogflow, { Dialogflow_V2 } from "react-native-dialogflow";

export default class VoiceBot extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      result: ""
    }
    Dialogflow.setConfiguration(
      "0476d66c17ab437b87c18bb0bdc93428", Dialogflow.LANG_ENGLISH
    );
  }

  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
        <Button onPress={() => {
          Dialogflow.startListening(result => {
            this.setState({result: result.result ? result.result.fulfillment.speech : "no result"})
          }, error => {
            console.log(error)
          })
        }}>
          <Text>Start listening</Text>
        </Button>

        <Button onPress={() => Dialogflow.finishListening()}>
          <Text>Stop listening</Text>
        </Button>

        <Form>
          <Item>
            <Input placeholder="Message" value={this.state.text} onChangeText={(text) => this.setState({text: text})}/>
          </Item>
        </Form>

        <Button onPress={() => {
          Dialogflow.requestQuery(this.state.text, result => {
            this.setState({result: result.result ? result.result.fulfillment.speech : "no result", text: ""})
          }, error => {
            console.log(error)
          })
        }}>
          <Text>Send</Text>
        </Button>

        <Text>{this.state.result}</Text>

      </Container>
    );
  }
}
