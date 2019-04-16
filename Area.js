import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, ScrollView} from 'react-native'
import {Item, Footer, FooterTab, Button, Icon, CheckBox} from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'


import KeyboardView from './KeyboardView'

/**
 * I think that users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/
const invisiblePlaceholder = "                                                                                                   "

export default class Area extends Component{
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        showLastTime: false,
        lastTime: new Date(),
        lastHours: '00',
        lastMinutes: '00',
        showNextTime: false,
        nextTime: new Date(),
        nextHours: '00',
        nextMinutes: '00'
    }

    static navigationOptions =  {
        title: "Survey Area"
    }

    displayTimeString = (time) => {
        const tideTime = this.state.surveyData[time]
        if(!tideTime)
            return "00:00";
        let timeString, hours, hourString, minutes, minutesString;
        hours = tideTime.getHours();
        hourString = hours < 10 ? `0${hours}` : `${hours}`
        minutes = tideTime.getMinutes();
        minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

        timeString = `${hourString}:${minutesString}`;
        return timeString;
    }

    onPressLastTime = () => {
        this.setState({showLastTime: true})
    }

    setLastTime = (time) => {
        this.setState(
            {
                lastTime: time,
                lastHours: time.getHours() < 10 ? `0${time.getHours()}` : time.getHours(),
                lastMinutes: time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes(),
                showLastTime: false
            }
        )
    }

    onCancelLast = () => {
        this.setState({showLastTime: false})

    }

    onPressNextTime = () => {
        this.setState({showNextTime: true})
    }

    setNextTime = (time) => {
        this.setState(
            {
                nextTime: time,
                nextHours: time.getHours() < 10 ? `0${time.getHours()}` : time.getHours(),
                nextMinutes: time.getMinutes().length < 10 ? `0${time.getMinutes()}` : time.getMinutes(),
                showNextTime: false
            }
        )
    }

    onCancelNext = () => {
        this.setState({showNextTime: false})

    }

    moveToTeamInfo = () => {
        this.props.navigation.push('TeamInfo', {surveyData: this.state.surveyData});
    }

    updateSurveyTime(refName, e) {
        let key = refName;
        let val = e;

        this.setState(prevState => {
            prevState.surveyData[key] = val;
            return prevState;
        })
        
    }

    updateSurveyState(refName, e) {
        console.log(e);
        let key =  refName;//e.target.id;
        let value = e.nativeEvent.text;
        console.log(`Key: ${key}, value: ${value}`);
        this.setState(prevState => {
            prevState.surveyData[key] = value;
            return prevState;
        })
        
        console.log("State set: " + JSON.stringify(this.state.surveyData))
    }

    checkedbox(refName, e) {
        let key = refName;
        let selection = this.state.surveyData[refName];
        this.setState(prevState => {
            prevState.surveyData[key] = !selection;
            return prevState;
        })
    }

    render() {
        return(
            <KeyboardView style={styles.container}>
                <ScrollView style={{marginBottom:50}}>

                {/* Render the Beach Info */}
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize:20}}>Beach Info</Text>
                    <Text style={styles.inputSingle}>Beach Name</Text>
                    <Item regular>
                        <TextInput
                            ref = 'beachName' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'beachName')}
                            value={this.state.surveyData.beachName}
                        />
                    </Item>

                    <Text style={styles.inputSingle}>Latitude (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'latitude' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'latitude')}
                            value={this.state.surveyData.latitude}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Longitude (Link to GPS stuff here)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'longitude' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'longitude')}
                            value={this.state.surveyData.longitude}
                        />
                    </Item>
                </View>
                <View style={styles.inputDoubleContainer}>
                    <View style={styles.inputDouble}>
                        <Text>
                            Major Usage:
                        </Text> 
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.usageRecreation} 
                                onPress={this.checkedbox.bind(this, 'usageRecreation')} 
                            />
                            <Text style={{marginLeft:10}}>Recreation</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.usageCommercial} 
                                onPress={this.checkedbox.bind(this, 'usageCommercial')} 
                            />
                            <Text style={{marginLeft:10}}>Commercial</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.usageOther} 
                                onPress={this.checkedbox.bind(this, 'usageOther')} 
                            />
                            <Text style={{marginLeft:10}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.usageOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text>
                            Reason For Beach Choice:
                        </Text>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.locationChoiceProximity} 
                                onPress={this.checkedbox.bind(this, 'locationChoiceProximity')} 
                            />
                            <Text  style={{marginLeft:5}}>Proximity/Convenience</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.locationChoiceDebris} 
                                onPress={this.checkedbox.bind(this, 'locationChoiceDebris')} 
                            />
                            <Text style={{marginLeft:10}}>Known for Debris</Text>
                        </View>
                        <View style={styles.checkBox}>
                            <CheckBox 
                                style={styles.checkBoxInput} 
                                checked={this.state.surveyData.locationChoiceOther} 
                                onPress={this.checkedbox.bind(this, 'locationChoiceOther')} 
                            />
                            <Text style={{marginLeft:10}}>Other</Text>
                        </View>
                        <Item regular style={{marginTop: 3}}>
                            <TextInput 
                                editable={this.state.surveyData.locationChoiceOther === true} 
                                placeholder={invisiblePlaceholder} 
                                style={{height: 30}}
                            />
                        </Item>
                    </View>
                </View>
                <View style={{marginLeft: 15, marginRight:15}}>
                    <Text style={styles.inputSingle}>Compass Direction (Degrees)</Text>
                    <Item regular>
                        <TextInput
                            ref = 'cmpsDir' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'cmpsDir')}
                            value={this.state.surveyData.cmpsDir}
                        />
                    </Item>
                </View>

                {/* Render the Nearest River Output Section */}
                <View style={styles.segmentSeparator}></View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Nearest River Output</Text>
                    <Text style={styles.inputSingle}>River Name</Text>
                    <Item regular>
                        <TextInput
                            ref = 'riverName' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'riverName')}
                            value={this.state.surveyData.riverName}
                        />
                    </Item>
                    <Text style={styles.inputSingle}>Approximate Distance</Text>
                    <Item regular>
                        <TextInput
                            ref = 'riverDistance' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'riverDistance')}
                            value={this.state.surveyData.riverDistance}
                        />
                    </Item>
                </View>

                {/* Render Tide information */}
                <View style={styles.segmentSeparator}></View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Last Tide Before Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <TextInput
                            ref = 'tideTypeA' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'tideTypeA')}
                            value={this.state.surveyData.tideTypeA}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput
                            ref = 'tideHeightA' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'tideHeightA')}
                            value={this.state.surveyData.tideHeightA}
                        />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressLastTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                                <Text style={{marginRight: 5}}>
                                    Select Time
                                </Text>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showLastTime}    
                                mode={'time'}
                                onConfirm={this.updateSurveyTime.bind(this, 'tideTimeA')}
                                is24Hour={false}   
                                onCancel={this.onCancelLast}                   
                            />
                            <Text>{this.displayTimeString('tideTimeA')}</Text>
                        </Item>
                    </View>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Next Tide After Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <TextInput
                            ref = 'tideTypeB' 
                            placeholder={invisiblePlaceholder} 
                            style={styles.textInput} 
                            onChange={this.updateSurveyState.bind(this, 'tideTypeB')}
                            value={this.state.surveyData.tideTypeB}
                        />
                    </Item>
                </View>
                <View style={[styles.inputDoubleContainer, {marginBottom: 20}]}>
                    <View style={styles.inputDouble}>
                        <Text style={styles.inputDouble}>Height (ft.)</Text>
                        <Item regular>
                            <TextInput
                                ref = 'tideHeightB' 
                                placeholder={invisiblePlaceholder} 
                                style={styles.textInput} 
                                onChange={this.updateSurveyState.bind(this, 'tideHeightB')}
                                value={this.state.surveyData.tideHeightB}
                            />
                        </Item>
                    </View>
                    <View style={styles.inputDouble}>
                        <Text style={{marginBottom: 5}}>Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressNextTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                                <Text style={{marginRight: 5}}>Select Time</Text>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showNextTime}    
                                mode={'time'}
                                onConfirm={this.updateSurveyTime.bind(this, 'tideTimeB')}
                                is24Hour={false}   
                                onCancel={this.onCancelNext}                   
                            />
                            <Text>{this.displayTimeString('tideTimeB')}</Text>
                        </Item>
                    </View>
                </View>
                </ScrollView>

                {/* Render the footer used for navigation */}
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button vertical onPress={this.moveToTeamInfo}>
                            <Icon name='person' />
                            <Text>Info</Text>
                        </Button>
                        <Button active style={{color: 'skyblue'}} vertical>
                            <Icon name='navigate' />
                            <Text style={{color: 'white'}}>Area</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='grid' />
                            <Text >SRS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='people' />
                            <Text >AS</Text>
                        </Button>
                        <Button vertical>
                            <Icon name='search' />
                            <Text >Micro</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </KeyboardView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputSingleContainer: {
        padding: 30,
    },
    inputSingle: {
        marginTop: 15
    },
    inputDoubleContainer: {
        flexDirection: 'row'
    },
    inputDouble: { 
        flex: 2,
        marginLeft: 10,
        marginRight: 10
    },
    checkBox: {
        flexDirection: 'row',
        marginTop: 3
    },
    checkBoxInput: {
        marginRight:5, 
        height: 25, 
        width: 25
    },
    textInput: {
        height: 40,
        fontSize: 16
    },
    segmentSeparator: {
        padding: 15,
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center'
    }
})