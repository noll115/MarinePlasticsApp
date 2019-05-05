import React, { Component } from 'react'
import {TextInput, Text, View, FlatList } from 'react-native'
import {ActionSheet, Item, Button, Icon, Input, Tab, Tabs, Header, Left, Body, Right, Title, Picker} from 'native-base'
import Expo from 'expo'

import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'
import SurveyFooter from './SurveyFooter'
import RibInput from './RibInput'
import RibEntry from './RibEntry'

const tabHeadings = [
    '+ Add Rib',
    'Rib 1',
    'Rib 2',
    'Rib 3',
    'Rib 4'
]

export default class SurfaceRibScan extends Component {
    state = {
        surveyData: this.props.surveyData ? this.props.surveyData : {},
        SRSData: this.props.SRSData ? this.props.SRSData : {},
        ASData: this.props.ASData ? this.props.ASData : {},
        MicroData: this.props.MicroData ? this.props.MicroData : {},
        modalVisible: false,
        tabArray: this.props.tabArray ? this.props.tabArray : [],
        ribsToSelect: [
            <Picker.Item key='1' label="1" value="1" />,
            <Picker.Item key='2' label="2" value="2" />,
            <Picker.Item key='3' label="3" value="3" />,
            <Picker.Item key='4' label="4" value="4" />
        ]
    }

    submitAddRib = (ribNumber, ribLength, ribStart) => {
        console.log("Made it")
        let ribArrayName = `r${ribNumber}Items`
        let ribNumLength = `r${ribNumber}Length`
        let ribNumStart = `r${ribNumber}Start`
        let newRib = (
            <Tab key={ribNumber} heading={`Rib ${ribNumber}`}>
                <RibInput
                    id={ribNumber}
                    SRSData={this.state.SRSData}
                    surveyData={this.state.surveyData}
                    ribNumber={ribNumber} 
                    decrementSRS={this.props.decrementSRS} 
                    incrementSRS={this.props.incrementSRS}
                    inputItems={this.state[ribArrayName]}
                    updateSurveyState={this.props.updateSurveyState}
                />
            </Tab>
        )
        
        this.setState(prevState => {
            prevState.tabArray.push(newRib);
            prevState.surveyData[ribNumLength] = ribLength;
            prevState.surveyData[ribNumStart] = ribStart;
            prevState.ribsToSelect = prevState.ribsToSelect.filter(comp => comp.props.value !== ribNumber)
            console.log(prevState)
            return prevState
        })
    }

    remakeTabs = () => {
        const {surveyData} = this.state;
        if(surveyData.r1Start !== undefined){
            this.submitAddRib('1', surveyData.r1Length, surveyData.r1Start);
        }
        if(surveyData.r2Start !== undefined){
            this.submitAddRib('2', surveyData.r2Length, surveyData.r2Start);
        }
        if(surveyData.r3Start !== undefined){
            this.submitAddRib('3', surveyData.r3Length, surveyData.r3Start);
        }
        if(surveyData.r4Start !== undefined){
            this.submitAddRib('4', surveyData.r4Length, surveyData.r4Start);
        }
    }

    /**
     * We need to check to see if we're editing a pre-existing survey. If so, 
     * we have to reconstruct the tabs
     */
    componentWillMount(){
        this.remakeTabs()
    }
    
    /**
     * Here we render the actual input screens within the tabs so that each rib can have its
     * own input screen dedicated to entering data
     * Once we get to 4 ribs, we want to hide the option to add a rib (for now...)
     */
    render() {
        console.log("OUTER RENDER" )
        return (
            <View style={styles.container}>
                <Header hasTabs style={{height : 75}}>
                    <Left style={{marginTop: 20}}>
                        
                    </Left>
                    <Body>
                        <Text style={{marginTop: 20, fontSize: 18, color: 'white'}}>Header</Text>
                    </Body>
                    <Right style={{marginTop: 25}}>
                        <Button success onPress={this.props.onClickFinish}>
                            <Text style={{padding: 5, color: 'white'}}>Finish</Text>
                        </Button>
                    </Right>
                </Header>
                <Tabs>
                    {
                        this.state.tabArray.length < 4 ? 
                            <Tab heading='+ Add Rib'>
                                <RibEntry
                                    updateSurveyState={this.props.updateSurveyState}
                                    surveyData={this.props.surveyData}
                                    submitAddRib={this.submitAddRib}
                                    tabArray={this.state.tabArray}
                                    renderTabs={this.renderTabs}
                                    ribsToSelect={this.state.ribsToSelect}
                                />
                            </Tab>
                        : null
                    }
                   {this.state.tabArray}  
                </Tabs>
               
            </View>
        )
    }
}
