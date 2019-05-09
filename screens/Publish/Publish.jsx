import React, { Component } from 'react';

import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

import {

  AsyncStorage
} from 'react-native';

import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Card,
  CardItem,
} from 'native-base';

import Scanner from "./Scanner";
import Import from "./Import";


export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      isScanning : false,
      surveys : []
    };

    // bind methods
    this.toScanner = this.toScanner.bind(this);
    this.toImport = this.toImport.bind(this);
    this.removeSurvey = this.removeSurvey.bind(this);
  }

  async componentDidMount() {
      this.setState({ loading : false });
  }

  removeSurvey(index) {
      this.setState(prevState => {
          prevState.surveys.splice(index, 1);
          return prevState;
      });

  }

  toScanner() { this.setState({ isScanning = true  }); }
  toImport () { this.setState({ isScanning = false }); }

  render() {

    const { navigation } = this.props;
    let surveys = navigation.getParam('surveys', []);

    if(this.state.loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    else {
      return(
        <Container>
            {this.state.isScanning ?
                <Scanner surveys={this.state.surveys} toImport={this.toImport}/>
            :
                <Import surveys={this.state.surveys} removeSurvey={this.removeSurvey} toScanner={this.toScanner}/>
            }
        </Container>
      );
    }
  }
}
