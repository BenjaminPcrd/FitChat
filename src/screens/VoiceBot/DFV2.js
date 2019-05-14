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

import { Dialogflow_V2 } from "react-native-dialogflow";
import auth from './auth.json'

export default class DFV2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      result: ""
    }
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      auth.client_email,
      auth.private_key,
      Dialogflow_V2.LANG_ENGLISH,
      auth.project_id
    );
  }

  _sendButtonV2() {
    Dialogflow_V2.requestQuery(this.state.text, result => {
      console.log(result.queryResult)
      this.setState({result: JSON.stringify(result.queryResult.fulfillmentText), text: ""})
    }, error => {
      console.log(error)
    })
  }

  render() {
    return (
      <Container>
        <Title style={{color: 'black'}}> Dialogflow V2</Title>
        <Button onPress={() => {
          Dialogflow_V2.onListeningStarted(()=>{
            console.log("listening started");
          });

          Dialogflow_V2.onListeningCanceled(()=>{
            console.log("listening canceled");
          });

          Dialogflow_V2.onListeningFinished(()=>{
            console.log("listening finished");
          });

          Dialogflow_V2.onAudioLevel(level=>{
            console.log(level);
          });

          Dialogflow_V2.startListening(result=>{
              console.log(result);
              this.setState({result: JSON.stringify(result.queryResult.fulfillmentText), text: ""})
          }, error=>{
              console.log(error);
          });
        }} ><Text>start listening</Text></Button>

        <Button onPress={() => {
          Dialogflow_V2.finishListening()
        }}>
          <Text>Stop listening</Text>
        </Button>

        <Form>
          <Item>
            <Input
              placeholder="Message"
              value={this.state.text}
              onChangeText={(text) => this.setState({text: text})}
              onSubmitEditing={() => this._sendButtonV2()}
            />
          </Item>
        </Form>

        <Button onPress={() => this._sendButtonV2()}>
          <Text>Send</Text>
        </Button>

        <Text>{this.state.result}</Text>
      </Container>
    );
  }
}
