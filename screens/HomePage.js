import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl
} from 'react-native';

import {
  Icon,
  Footer,
  Button,
  Toast,
  Text,
  Container,
  Header,
  Content,
  View
} from 'native-base'
import Modal from 'react-native-modal'

import surveyDB from '../storage/mongoStorage'
import { ScrollView } from 'react-native-gesture-handler';

import { SurveyCard } from './Home/SurveyCard';
import { DeleteModal, GeneralModal } from './Home/HomeModals';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingSurveys: false,
      inProgress: [],
      isModalVisible: false,
      chosenSurvey: "",
      isDeleteVisible: false,
      shouldShowDelete: false
    }

    this.navToPublish = this.navToPublish.bind(this);
    this.openSurvey=this.openSurvey.bind(this)
    this.deleteSurvey=this.deleteSurvey.bind(this);
  }

  static navigationOptions = {
    title: 'Home Page'
  }

  async retrieveInProgress() {
    let surveys =  await surveyDB.getNameDate();
    console.log(`Retrieved: ${surveys}`)
    this.setState({
      inProgress: surveys
    })
  }

  componentWillMount(){
    this.retrieveInProgress();
  }


  refreshSurveys = () => {
    console.log("refreshing!");
  }

  cancelDelete = () => this.setState({isDeleteVisible: false});
  cancelModal = () => this.setState({isModalVisible: false, chosenSurvey: ""});
  onPressDeleteSurvey = () => {
    this.setState({
      shouldShowDelete: true,
      isModalVisible: false
    });
  }

  async openSurvey(){
    this.cancelModal();
    let survey;
    let survID = this.state.chosenSurvey._id
    survey = await surveyDB.getSurvey(survID);
    this.props.navigation.navigate('SurveyContainer',
      {
        surveyData: survey.surveyData,
        ribData: survey.ribData,
        surveyName: survey.surveyName,
        SRSData: survey.SRSData,
        ASData: survey.ASData,
        MicroData: survey.MicroData,
        inProgress: survey._id,
      })
  }

  async navToPublish() {
    this.cancelModal();
    let survName = this.state.chosenSurvey.surveyName;
    let survey;
    let survID = this.state.chosenSurvey._id
    survey = await surveyDB.getSurvey(survID);
    console.log(survey._id);
    this.props.navigation.navigate('PublishContainer',
      {initSurvey : {
        surveyData: survey.surveyData,
        ribData: survey.ribData,
        surveyName: survName,
        SRSData: survey.SRSData,
        ASData: survey.ASData,
        MicroData: survey.MicroData,
        inProgress: survey._id,
      }}
    );
  }

  endModals = () => {
    this.setState({isDeleteVisible: false, isModalVisible: false})
  }

  async deleteSurvey(){
    await surveyDB.deleteSurvey(this.state.chosenSurvey._id);
    this.endModals();
    this.retrieveInProgress();
  }

  renderPublished(){
    return(
      <Text style={{textAlign: 'center', fontSize: 18, color: 'gray'}}>You haven't published any surveys!</Text>
    )
  }

  showSurveyModal = (chosenSurvey) => {
    this.setState({isModalVisible: true, chosenSurvey: chosenSurvey})
  }

  openDelete = () => {
    if(this.state.shouldShowDelete) {
        this.setState({
          isDeleteVisible: true,
          shouldShowDelete: false
        })
    }
  }

  renderInProgress = () => {
    const {inProgress} = this.state;
    let surveyArray = [];
    for(var i = 0; i < inProgress.length; i++){
      let survComponent = (
        <SurveyCard
          showSurveyModal={this.showSurveyModal}
          survey={inProgress[i]}
          />
      )
      surveyArray.push({key: inProgress[i].surveyName, val: survComponent})
    }
    return <FlatList data={surveyArray} extraData={this.state} renderItem={({item}) => {return item.val}} />
  }

  render() {
    return(
      <Container style={{flex: 1}}>
        <Content>
          <View style={{marginBottom: 50}}>
            <Text style={[styles.paragraph]}>
              In Progress
            </Text>
            <ScrollView
              style={{height: '45%'}}
              >
              {this.renderInProgress()}
            </ScrollView>
          </View>
          <View style={{ marginBottom: 50}}>
            <Text style={styles.paragraph}>
              Published
            </Text>
            {this.renderPublished()}
          </View>

          <Button full info style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('SurveyEntry')}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Survey Page</Text>
          </Button>
          {__DEV__ &&
              <Button full info style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('PublishContainer')}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Test Survey Merging and Publishing</Text>
              </Button>
          }
          <Button info full style={{marginBottom: 18, borderRadius: 5}} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>Login</Text>
          </Button>
          <GeneralModal
            isModalVisible={this.state.isModalVisible}
            openDelete={this.openDelete}
            name={this.state.chosenSurvey.surveyName}
            cancelModal={this.cancelModal}
            openSurvey={this.openSurvey}
            onPressDeleteSurvey={this.onPressDeleteSurvey}
            navToPublish={this.navToPublish}
            />
          <DeleteModal
            isDeleteVisible={this.state.isDeleteVisible}
            name={this.state.chosenSurvey.surveyName}
            cancelDelete={this.cancelDelete}
            deleteSurvey={this.deleteSurvey}
            />
        </Content>
      </Container>
    );
  }
}

export default HomePage;


// Style variable.
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  paragraph: {
    marginHorizontal: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  }
});
