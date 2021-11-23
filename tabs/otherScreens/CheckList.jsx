import React from "react";
import { View, Text } from "react-native";
import { CheckBox as DefaultCheckBox } from "react-native-elements";
import Button from "../../components/Button";

export default function WelcomeScreen({ navigation }) {
  const CheckBox = (x) => (
    <DefaultCheckBox {...x} textStyle={{ fontSize: 16 }} />
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecf0f1",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          RAKApp Onboarding Checklist
        </Text>
      </View>
      <View style={{ flex: 3 }}>
        <CheckBox title="Sign documents" />
        <CheckBox title="Receive uniform" />
        <CheckBox title="Find barracks" />
        <CheckBox title="Other stuff" />
        <CheckBox title="Other stuff" />
        <CheckBox title="Other stuff" />
      </View>
    </View>
  );
}
