import React, { useLayoutEffect, useState } from 'react';
import {StyleSheet, View } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import { Button, Input, Text } from "react-native-elements";
import {StatusBar} from "expo-status-bar";
//import { auth } from "../firebase";
import Firebase from "../../constants/FireBaseDb";


/**THIS PAGE IS NOT CURRENTLY USED
 * it contains functionality for a register screen
 * and it works, but was not necessary
 */
const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login", //navigate back to login
        });
    }, [navigation]);
    
    const register = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password) //create the user in firebase
            .then(authUser => {
                authUser.user.updateProfile({ //update the profile
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png", //default image
            });
        })
        .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />

            <Text h3 style={{ marginBottom: 50}}>
                Create an Account
            </Text>

            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) => setName(text)}    //set name from input
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}    //set email from input
                />
                <Input
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}    //set password from input
                />
                <Input
                    placeholder="Profile Picture URL (optional)"
                    autoFocus
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) => setName(text)}      //set picture from input
                    onSubmitEditing={register}    //calls register function automatically after entering this
                />
            </View>

            <Button
                containerStyle={styles.button}
                raised
                onPress={register} //button also calls register funtion
                title="Register"
            />
            <View style={{height: 100}} />

        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

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