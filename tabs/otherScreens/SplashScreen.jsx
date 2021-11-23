import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Animated, Text, StatusBar, Image } from 'react-native'
import MaskedViewIOS from '@react-native-community/masked-view'
import Dimensions from "../constants/Dimensions";

export default class SplashScreen extends Component {
    state = {
        animated: new Animated.Value(0),
        opacityA: new Animated.Value(0),
        opacityB: new Animated.Value(1),
        opacityC: new Animated.Value(1),
        loadingProgress: new Animated.Value(0),
        animationDone: false
    }

    componentDidMount() {
        const { animated, opacityA, opacityB, opacityC } = this.state;
        Animated.sequence([
            Animated.timing(opacityA, {
                toValue: 1,
                duration: 750,
            }),
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1250,
                }),
                Animated.timing(opacityB, {
                    toValue: 0,
                    duration: 1250,
                })
            ]),
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 0,
                    duration: 1,
                }),
                Animated.timing(opacityB, {
                    toValue: 1,
                    duration: 1,
                })
            ]),
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 1250,
                }),
                Animated.timing(opacityB, {
                    toValue: 0,
                    duration: 1250,
                })
            ]),
            Animated.parallel([
                Animated.timing(opacityC, {
                    toValue: 0,
                    duration: 1000,
                }),
                Animated.timing(this.state.loadingProgress, {
                    toValue: 100,
                    duration: 1000,
                    useNativeDriver: true,
                    delay: 400
                })
            ]),
        ]).start(() => {
            this.setState({ animationDone: true });
            this.props.navigation.navigate("Login");
        }
        )
    }

    render() {
        const { animated, opacityA, opacityB, opacityC } = this.state;

        const colorLayer = this.state.animationDone ? null : (
            // <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "navy", opacity: opacityC }]} />
            <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacityC }]}>
                <Image source={require('../assets/images/splashBackgroundRed.png')} style={{
                    flex: 1,
                    width: Dimensions.width,
                    height: Dimensions.height,
                }} />
            </Animated.View>
        );
        const whiteLayer = this.state.animationDone ? null : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "white" }]} />
        );
        const imageScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 15, 75],
                        outputRange: [0.1, 0.06, 16]
                    })
                }
            ]
        }
        const opacity = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0, 25, 75],
                outputRange: [0, 0, 1],
                extrapolate: "clamp"
            })
        }
        return (
            <View style={{ flex: 1 }}>
                {colorLayer}
                <MaskedViewIOS
                    style={{ flex: 1 }}
                    maskElement={
                        <View style={styles.centered}>
                            <Animated.Image
                                source={require('../assets/images/Torri.png')}
                                style={[{
                                    width: 1000,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: 'absolute',
                                    opacity: opacityA,
                                }, imageScale]}
                                resizeMode="contain"
                            />
                            <Animated.View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                position: 'absolute',
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                opacity: opacityB,
                                backgroundColor: 'grey',
                                transform: [
                                    {
                                        scale: animated
                                    }
                                ]
                            }}></Animated.View>

                        </View>
                    }>
                    {whiteLayer}
                </MaskedViewIOS>
            </View>
        )
    }
}
// Login UI needed to be linked at whiteLayer after line 133

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
})