import React, {Component} from 'react'
import {TextInput, View, Text, StyleSheet, ScrollView} from 'react-native'
import {Item, Footer, FooterTab, Button, Icon, CheckBox, Picker} from 'native-base'
import DateTimePicker from 'react-native-modal-datetime-picker'

import SurveyFooter from './SurveyFooter'
import KeyboardView from '../../components/KeyboardView'
import styles from './surveyStyles'

/**
 * I think that users still need to enter in this information while they're at the beach because they need
 * to be able to take down the wave height, compass direction, wind speed, and possibly coordinates when
 * they're out in the field
*/
const invisiblePlaceholder = "                                                                                                   "

export default class Area extends Component{
    state = {
        surveyData: this.props.navigation.getParam('surveyData') ? this.props.navigation.getParam('surveyData') : {},
        SRSData: this.props.navigation.getParam('SRSData') ? this.props.navigation.getParam('SRSData') : {},
        ASData: this.props.navigation.getParam('ASData') ? this.props.navigation.getParam('ASData') : {},
        r1Items: this.props.navigation.getParam('r1Items') ? this.props.navigation.getParam('r1Items') : [],
        r2Items: this.props.navigation.getParam('r2Items') ? this.props.navigation.getParam('r2Items') : [],
        r3Items: this.props.navigation.getParam('r3Items') ? this.props.navigation.getParam('r3Items') : [],
        r4Items: this.props.navigation.getParam('r4Items') ? this.props.navigation.getParam('r4Items') : [],
        asItems: this.props.navigation.getParam('asItems') ? this.props.navigation.getParam('asItems') : [],
        MicroData: this.props.navigation.getParam('MicroData') ? this.props.navigation.getParam('MicroData') : {},
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
            return "--:--";
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
        this.props.navigation.push(
            'TeamInfo', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToSRS = () => {
        this.props.navigation.push(
            'SurfaceRibScan', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToAS = () => {
        this.props.navigation.push(
            'AccumulationSweep', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
    }

    moveToMicro = () => {
        this.props.navigation.push(
            'MicroDebris', 
            {
                surveyData: this.state.surveyData, 
                SRSData: this.state.SRSData,
                ASData: this.state.ASData,
                r1Items: this.state.r1Items,
                r2Items: this.state.r2Items,
                r3Items: this.state.r3Items,
                r4Items: this.state.r4Items,
                asItems: this.state.asItems,
                MicroData: this.state.MicroData
            }
        );
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

    onTideChange(refName, value) {
        this.setState(prevState => {
            prevState.surveyData[refName] = value;
            console.log(prevState.surveyData)
            return prevState
        })
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
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.tideTypeA}
                            onValueChange={this.onTideChange.bind(this, 'tideTypeA' )}
                        >
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Low" value='low' />
                        </Picker>
                        
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
                        <Text style={{marginBottom: 5}}>Select Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressLastTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showLastTime}    
                                mode={'time'}
                                onConfirm={this.updateSurveyTime.bind(this, 'tideTimeA')}
                                is24Hour={false}   
                                onCancel={this.onCancelLast}                   
                            />
                            <TextInput 
                                editable={false }
                                style={{width: '70%', textAlign: 'center', fontSize: 17}} 
                                value={this.displayTimeString('tideTimeA')}
                            />
                        </Item>
                    </View>
                </View>
                <View style={styles.inputSingleContainer}>
                    <Text style={{fontSize: 20}}>Next Tide After Cleanup</Text>
                    <Text style={styles.inputSingle}>Type</Text>
                    <Item regular>
                        <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down"/>}
                            placeholder="Please Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            style={{width: undefined}}
                            selectedValue={this.state.surveyData.tideTypeB}
                            onValueChange={this.onTideChange.bind(this, 'tideTypeB' )}
                        >
                            <Picker.Item label="High" value="high" />
                            <Picker.Item label="Low" value='low' />
                        </Picker>
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
                        <Text style={{marginBottom: 5}}>Select Time</Text>
                        <Item regular>
                            <Button onPress={this.onPressNextTime} style={{color: 'gray'}}>
                                <Icon name='clock'></Icon>
                            </Button>
                            <DateTimePicker
                                isVisible={this.state.showNextTime}    
                                mode={'time'}
                                onConfirm={this.updateSurveyTime.bind(this, 'tideTimeB')}
                                is24Hour={false}   
                                onCancel={this.onCancelNext}                   
                            />
                            <TextInput 
                                editable={false }
                                style={{width: '70%', textAlign: 'center', fontSize: 17}} 
                                value={this.displayTimeString('tideTimeB')}
                            />
                        </Item>
                    </View>
                </View>
                </ScrollView>

                {/* Render the footer used for navigation */}
                <SurveyFooter 
                    area 
                    moveToTeamInfo={this.moveToTeamInfo} 
                    moveToSRS={this.moveToSRS}
                    moveToAS={this.moveToAS}
                    moveToMicro={this.moveToMicro}
                />
            </KeyboardView>
        )
    }
}
