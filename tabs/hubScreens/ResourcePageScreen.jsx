import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Table, Rows } from "react-native-table-component";

import Colors from "../../constants/Colors";
import Dimensions from "../../constants/Dimensions";
import RectButton from "../../components/RectButton";
import { ScrollView } from "react-native-gesture-handler";
import Button from "react-native-button";
import { useNavigation } from "@react-navigation/native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default function ResourcePageScreen({ route }) {
  const navigation = useNavigation();
  const { image, name, description, events } = route.params;
  var dates = {};
  var eventDescriptions = {};
  //let elems = {};
  events.forEach((event) => {
    console.log(event);
    var date = event.Date;
    dates[date] = { marked: true, dotColor: "blue" };

    eventDescriptions[date] = event.Description;

    //eventDescriptions.push(elem);
  });
  console.log("dates is: ");
  console.log(dates);
  console.log(eventDescriptions);

  const tableData = [
    ["Phone:", "123456"],
    ["Email:", "resourceemail@email.com"],
    ["Location:", "the base"],
  ];

  const titleWidth = Dimensions.window.width * 0.27;
  const contentWidth = Dimensions.window.width * 0.65;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      paddingTop: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.white,
      paddingBottom: 20,
    },
    sv: {
      backgroundColor: Colors.white,
    },
    buttonContainer: {
      paddingTop: 20,
    },
    table: {
      paddingHorizontal: 10,
    },
    tableText: {
      fontSize: 16,
      margin: 6,
    },
    image: {
      width: 70,
      height: 70,
    },
    title: {
      fontSize: 20,
      alignItems: "center",
      marginTop: 20,
      marginBottom: 10,
    },
    calendar: {
      width: "100%",
    },
  });

  return (
    <ScrollView style={styles.sv}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image }} />

        <Text style={[styles.title, Dimensions.font]}>{description}</Text>

        <View style={styles.table}>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: Colors.lightGray }}
          >
            <Rows
              data={tableData}
              textStyle={[styles.tableText, Dimensions.font]}
              widthArr={[titleWidth, contentWidth]}
            />
          </Table>
        </View>
        <Calendar
          style={styles.calendar}
          markedDates={dates}
          // Initially visible month. Default = Date()
          //current={'2021-25-09'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          //minDate={'2012-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          //maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            alert(eventDescriptions[day.dateString]);
          }}
          // Handler which gets executed on day long press. Default = undefined
          //onDayLongPress={(day) => {console.log('selected day', day.dateString)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          //monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          //hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          //renderArrow={(direction) => (<Arrow/>)}
          // Do not show days of other months in month page. Default = false
          //hideExtraDays={true}
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          //disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          //firstDay={1}
          // Hide day names. Default = false
          //hideDayNames={true}
          // Show week numbers to the left. Default = false
          //showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          //disableArrowLeft={true}
          // Disable right arrow. Default = false
          //disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          //disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter
          //renderHeader={(date) => {/*Return JSX*/}}
          // Enable the option to swipe between months. Default = false
          //enableSwipeMonths={true}
        />
        <Button
          containerStyle={{
            marginTop: 20,
            padding: 10,
            paddingBottom: 15,
            height: 45,
            width: "75%",
            overflow: "hidden",
            borderRadius: 20,
            backgroundColor: Colors.primary,
          }}
          //disabledContainerStyle={{ backgroundColor: "white" }}
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
          onPress={() => navigation.navigate("Resource Documents")}
        >
          Documents
        </Button>
      </View>
    </ScrollView>
  );
}
