import React, { useState } from "react";
import * as Font from "expo-font";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import Navigation from "./Navigation";

import Flag from "./assets/images/Flag.jpg";
import History from "./assets/images/history2.png";
import Bat133 from "./assets/images/battalions/1-33.png";
import Bat187 from "./assets/images/battalions/1-187.png";
import Bat2506 from "./assets/images/battalions/2-506.png";
import Bat3320 from "./assets/images/battalions/3-320th.png";
import Bat21BEB from "./assets/images/battalions/21BEB.png";
import Bat626 from "./assets/images/battalions/626BSB.png";
import Background from "./assets/images/Background.png";
import Sgm from "./assets/images/BREWER.jpg";
import Copic from "./assets/images/COPIC.jpeg";
import BatHHC from "./assets/images/battalions/HHC.png";
import Torri from "./assets/images/Torri.png";
import TorriRak from "./assets/images/TORRIRAK.png";
import Fit1 from "./assets/images/fitness/fitness1.jpg";
import Fit2 from "./assets/images/fitness/fitness2.jpg";
import Fit3 from "./assets/images/fitness/fitness3.jpg";
import Fit4 from "./assets/images/fitness/fitness4.jpg";
import Fit5 from "./assets/images/fitness/fitness5.jpg";

import ReggaeOne from "./assets/fonts/ReggaeOne-Regular.ttf";
import TorriCustom from "./assets/icomoon/icomoon.ttf";
import NavIcons from "./assets/icomoon/navbar-icons/icomoon.ttf";
import HubIcons from "./assets/icomoon/hub-icons/icomoon.ttf";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end

const _loadResourcesAsync = () =>
  Promise.all([
    Asset.loadAsync([
      Flag,
      History,
      Bat133,
      Bat187,
      Bat2506,
      Bat3320,
      Bat21BEB,
      Bat626,
      Background,
      Copic,
      BatHHC,
      Sgm,
      Torri,
      TorriRak,
      Fit1,
      Fit2,
      Fit3,
      Fit4,
      Fit5,
    ]),
    Font.loadAsync({
      "reggae-one": ReggaeOne,
      "torri-custom": TorriCustom,
      "navbar-icons": NavIcons,
      "hub-icons": HubIcons,
    }),
  ]);

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={_loadResourcesAsync}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </NavigationContainer>
  );
}
