import React, {Component} from 'react';

import {
  Container,
  Text,
  Button,
  Form,
  Item,
  Input,
  Title
} from 'native-base';

import Dialogflow from "react-native-dialogflow";

export default class DFV1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      result: ""
    }
  }

  componentDidMount() {
    Dialogflow.setConfiguration(
      "753f8f35601f48a6a558e80cc4b2edde",
      Dialogflow.LANG_ENGLISH,
    );
  }

  _sendButton() {
    Dialogflow.requestQuery(this.state.text, result => {
      console.log(result)
      this.setState({result: JSON.stringify(result.result.fulfillment.speech), text: ""})
    }, error => {
      console.log(error)
    })
  }

  render() {
    return (
      <Container>
        <Title style={{color: 'black'}}> Dialogflow V1</Title>
        <Button onPress={() => {
          Dialogflow.onListeningStarted(()=>{
            console.log("listening started");
          });

          Dialogflow.onListeningCanceled(()=>{
            console.log("listening canceled");
          });

          Dialogflow.onListeningFinished(()=>{
            console.log("listening finished");
          });

          Dialogflow.onAudioLevel(level=>{
            console.log(level);
          });

          Dialogflow.startListening(result=>{
              console.log(result);
              this.setState({result: JSON.stringify(result.result.fulfillment.speech), text: ""})
          }, error=>{
              console.log(error);
          });
        }} ><Text>start listening</Text></Button>

        <Button onPress={() => {
          Dialogflow.finishListening()
        }}>
          <Text>Stop listening</Text>
        </Button>

        <Form>
          <Item>
            <Input
              placeholder="Message"
              value={this.state.text}
              onChangeText={(text) => this.setState({text: text})}
              onSubmitEditing={() => this._sendButton()}
            />
          </Item>
        </Form>

        <Button onPress={() => this._sendButton()}>
          <Text>Send</Text>
        </Button>

        <Text>{this.state.result}</Text>
      </Container>
    );
  }
}
