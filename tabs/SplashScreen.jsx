import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
import MaskedViewIOS from "@react-native-community/masked-view";

export default class SplashScreen extends Component {
  state = {
    animated: new Animated.Value(0),
    opacityA: new Animated.Value(0),
    loadingProgress: new Animated.Value(0),
    animationDone: false,
  };

  componentDidMount() {
    const { animated, opacityA } = this.state;
    Animated.sequence([
      Animated.timing(opacityA, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(animated, {
        toValue: 1,
        duration: 1250,
      }),

      Animated.timing(animated, {
        toValue: 0,
        duration: 1,
      }),

      Animated.timing(animated, {
        toValue: 1,
        duration: 1250,
      }),

      Animated.timing(this.state.loadingProgress, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
        delay: 400,
      }),
    ]).start(() => {
      this.setState({ animationDone: true });
      this.props.navigation.navigate("Login");
    });
  }

  render() {
    const { opacityA } = this.state;

    const whiteLayer = !this.state.animationDone && (
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "#d60000" }]} />
    );
    const imageScale = {
      transform: [
        {
          scale: this.state.loadingProgress.interpolate({
            inputRange: [0, 15, 75],
            outputRange: [0.1, 0.06, 10],
          }),
        },
      ],
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      },
      centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    });
    return (
      <View style={{ flex: 1 }}>
        <MaskedViewIOS
          style={{ flex: 1 }}
          maskElement={
            <View style={styles.centered}>
              <Animated.Image
                source={require("../assets/images/Torri.png")}
                style={[
                  {
                    width: 1000,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    opacity: opacityA,
                  },
                  imageScale,
                ]}
                resizeMode="contain"
              />
            </View>
          }
        >
          {whiteLayer}
        </MaskedViewIOS>
      </View>
    );
  }
}
