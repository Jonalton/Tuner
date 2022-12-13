import React, { Component } from 'react';
import PitchFinder from 'pitchfinder';
import WavDecoder from 'wav-decoder';
import { Buffer } from 'buffer';
import AudioRecord from 'react-native-audio-record';
import { PermissionsAndroid, StyleSheet, View, Button } from 'react-native';
//import Permissions from 'react-native-permissions';
//import requestMicrophone from './Permission';

export default class Record extends Component {
    state = {
        recording: false,
        audiofile: ''
    }
    

    async componentDidMount(){
        await this.checkPermission();
        this.initAudioRecord();
    }

    checkPermission = async () => {
        const p = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        console.log('permission check', p);
        if (p === 'granted') return;
        return this.requestPermission();
    };

    requestPermission = async () => {
        const p = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title:"Tuner Microphone Permission",
                message:"Tuner needs to access to your microphone",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        );
        console.log('permission request', p);
    }

    initAudioRecord = () => {
        options = {
            sampleRate: 22050,
            channels: 1,
            bitsPerSample: 16,
            audioSource: 6,
            wavFile: 'test.wav'
        };


        AudioRecord.init(options);
        /*AudioRecord.on('data',data => {
            //const chunk = Buffer.from (data, 'base64');
            //console.log('chunk size', chunk.byteLength);
        });*/
    }

    start = () => {
        console.log('start record');
        const pitchFinder = new PitchFinder.YIN({ sampleRate: 22050 });
        this.setState({ recording: true, audiofile: '' });
        AudioRecord.start();
        i = 0;
        AudioRecord.on('data', data => {
            const chunk = Buffer.from (data, 'base64');
            const floatArray = Float32Array.from(chunk);
            //const decoded = WavDecoder.decode.sync(chunk)
            //const floatArray = decoded.channelData[0];
            //console.log(floatArray)
            const frequency = pitchFinder(floatArray);
            console.log(frequency); 
            if (frequency){
                console.log(frequency);
            }           
            //console.log('chunk size', chunk.byteLength);

            if (i == 0){
                console.log(floatArray);
            }
            else if (i == 1){
                console.log(floatArray);
            }
            i++;
            //console.log(data);

        });
    }

    stop = async () => {
        if (!this.state.recording) return;
        console.log('stop recording');
        //const fs = require('fs');
        let audioFile = await AudioRecord.stop();
        //AudioRecord.stop(); --> if function is not asynchronous
        console.log('audioFile', audioFile);/*
        const buffer = fs.readFileSync(audioFile);
        const decoded = WavDecoder.decode.sync(buffer);
        const float32Array = decoded.channelData[0];
        const pitch = detectPitch(float32Array);
        console.log(pitch);*/


        this.setState({ recording: false, audiofile: audioFile });
    }

    toggleRecord = () => {
        if (!this.state.recording){
            this.start();
            //this.setState({ recording: true });
            return;
        }
        this.stop();
        //this.setState({ recording: false });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button title="Record" onPress={this.toggleRecord}>Record</Button>  
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

/*
const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'test.wav'
};


AudioRecord.init(options);



toggle = 0;

function listenToggle(){
    if (toggle == 0){
        Alert.alert('stream start');
        AudioRecord.start();
        AudioRecord.on('data', data => {
            console.log(data);
        });
        toggle = 1;
    }
    else{
        Alert.alert('stream stop');
        //console.log(AudioRecord.stop());
        audioFile = AudioRecord.stop();
        console.log(audioFile);
        toggle = 0;
    }
}

function combine(){
    requestMicrophone();
    listenToggle();

}

const Audio_stream = () => {
    return (
        <Button title="Record" onPress={() => combine() }>Record</Button>
    )
}

export default Audio_stream;
*/