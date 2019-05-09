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
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      'dialogflow-vjheah@exercisecoachbotv2.iam.gserviceaccount.com',
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9ol/kAcTscVjM\n5VDV8tc5PZZyXE29Y2DTBF32ZLBCNCSUXyCM9C4eIy+YassplLB0Y2u/nDLnIoLX\n5Ma426XN/GlrwiA37J5qPKx+4w7Nror7egSivHjHVfoEdvls0an5NfYCvQlwZ7kF\n2EyQSZGEbPJfJ4K2JX4/WJagUvshSQwxOgrxsMV1sokkNDcv2txnvBmelozMbA7q\nE/UKtVhTx9POXnJCnrkVHTSk64z9kP6ld3WkD7mWJ1aZAX/NKDEJ6RlxOATRqYwD\nZpCgFDRYg0HeJRpbYXlelSdaWzCGIcFL2hNtIW3krKSvFgs78dpgRSjN5j5gOurT\nc9Yo2XefAgMBAAECggEAUukCzs/9NrlJ72+VW61sbxDfzclQjey8wRXoNRmJvLBK\ni/pZY3dBEJkmrpeGkvv4+DIdwm07DjZXCahzQBB8miZxOxVpe7n++wjjDCke6EuX\nZWLQUwxfLBwJj1krLWovzA9NK55V2ajnysfqla0sq77sazD9o8CZxX1ogdk2BjNF\nToIVXNRE6c2pAqnADQ3TpYr7FCkByBtYi2fhAy9P/Q1rEioEVVZ7Lt+v7du7pTrW\nvyNp17Q4deMqglrLGQZ/QnSJFS7WK8mugETpVLopkb8hRqKzU6NIS5G/Z1Pv72eo\nBhH6K7kAU5qKTxy7lF8PJa6zhiquoNg/CbOY5p0mUQKBgQD4WV73NVfDailTv/uX\nEmcUZVHFwqfi02WzPES1fAjNLGBaTqFQOTyZJ9LtG/QkTT1RArU7S2EsuVHh2Q2w\n24WQJacag5lHc+kF9FSg7PVij8tHj5V2w818rU8BTZfE2K6Wmi4wIZ3mSbPyGP5G\ngUBYseBQOcr9Nbt5dd90pkhpkQKBgQDDefGHvWxQG7FsdbiifAFkqAQ/Sn+WnZE+\n2HjBdSC5YH2wUJrcYaNphTTP3j0fn8WNEgDPA0FwLZA3Q3aNyrdpYzLcV2hl3d8q\ndcQ+EOQJrrs6yuQ6yzVopt/C6e4H1CzIX8U27XFP6YhDpI/G+IpDKBXdWJ/QrG0w\n559x9fG2LwKBgFlKcK17HVniMoetD/0KHcukfhkXWptgHEGsGpwRw2xZVy9A9BjO\n6225dsnPciEXMEOPMK/n80FMRBdqndSHqObh0snipNqe3xpH9aGCcNuGDbVl93wi\n/B+mhDBYwIeCzIrTVmXxwD7LIwqZV9rrn8ID+j19+fC+P/B0o+nh20kxAoGACzMy\ndo+Q5CoiCU/Za13lionh7GptUwjmKI6opJT8cgKoUPDdXqEthr8+HmbiY6x42jNc\n3n+WQUIrEC+KXGdwCNbJNDzB24xR3BHxU4kON8vOKHk1iHTaM4vUKEvU+pfalQR/\nvTzvkB+WUiHcpw7YhS6Hyi3owkEO5I1w4kuwNLsCgYEAxCxt6dQv/Ts99PRHOCYj\nb0/dHA8Z7AosIl1tnjUE637+dRuUzJdVA/11Sy1n7iO5qN5Wts8JHVcgY1rorZ1f\n/X8AmmweVbmnq+Mg2EwS1ML2hvMI/B8Sgvvd/sVUSy8zGCG6why1gT/54mQx2RZg\nTM8DiNaKbGBY+UfX4mKoRvw=\n-----END PRIVATE KEY-----\n',
      Dialogflow_V2.LANG_ENGLISH,
      'exercisecoachbotv2'
    );
  }

  render() {
    return (
      <Container style={{flex: 1, margin: 10}}>
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
            <Input placeholder="Message" value={this.state.text} onChangeText={(text) => this.setState({text: text})}/>
          </Item>
        </Form>

        <Button onPress={() => {
          Dialogflow_V2.requestQuery(this.state.text, result => {
            console.log(result.queryResult)
            this.setState({result: JSON.stringify(result.queryResult.fulfillmentMessages), text: ""})
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
