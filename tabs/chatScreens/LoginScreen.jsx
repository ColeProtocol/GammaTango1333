/*Page not currently being used*/

import React, { useEffect } from 'react';
import {useState} from "react";
import {StyleSheet, Text, View } from 'react-native';
import {KeyboardAvoidingView} from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from "expo-status-bar"
//import { auth } from '../firebase';
import Firebase from "../../constants/FireBaseDb";

/**THIS PAGE IS NOT CURRENTLY USED
 * it contains functionality for a login screen
 * that works, but was not needed. 
 */
const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = Firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home"); //if user is already signed in take them to the home page
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {  //basic email and password authentication
        Firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFoucus 
                    type="email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="password"
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" /> 
            <Button 
                onPress={() => navigation.navigate('Register')} //register button if not already in system, probably won't have a regiater page
                containerStyle={styles.button} 
                type="outline" title="Register" />
            <View style={{height: 50}} />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});