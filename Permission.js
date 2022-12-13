import React from 'react';
import {
    Button,
    PermissionsAndroid,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';


const requestMicrophone = async () => {
    try{
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title:"Tuner Microphone Permission",
                message:"Tuner needs to access to your microphone",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Microphone access granted");
        }
        else{
            console.log("Microphone access denied");
        }
    }
    catch (err){
        console.warn(err);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColour: "#ecf0f1",
        padding: 0
    },
    item: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    }
})

/*
    {requestRecordingPermission()}       
*/
const Permission = () => (
    <View style={styles.container}>
        <Text style={styles.item}>Try Permissions</Text>
            <Button title="request permissions"
                onPress={requestMicrophone} />

    </View>
)

export default requestMicrophone;