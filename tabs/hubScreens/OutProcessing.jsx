import React, { useEffect, useState } from 'react';
import Firebase from "../../constants/FireBaseDb";
import {
  View, StyleSheet, FlatList
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import Colors from '../../constants/Colors';
import getData from "../../assets/Async/getData";
import AsyncStorage from "@react-native-async-storage/async-storage";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: "100%",
    justifyContent: "center",
  },
  checkBox: {
    width: 300,
  },
});

export default function InProcessing() {
  //const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState([]);
  //const [email, setEmail] = useState();

  const checkTasks = async (results, user) => {
    let tasksMap = [];
    for(var i = 0; i < results.length; i++){
      console.log(results[i].Task);
      var strTask = results[i].Task;
      console.log(strTask);
      //const ref = Firebase.app().firestore().collection("users").doc(email).collection('tasks').doc(strTask);
      await Firebase.app().firestore().collection("users").doc(user).collection('outtasks').doc(strTask).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          //console.log(docSnapshot.get('status'));
          let elem =
          {
            'Task': strTask,
            'Status': docSnapshot.get('status'),
            'Email': user,
          }
          console.log(elem);
          //setTasks(elem);
          tasksMap.push(elem);
        } else {
          Firebase.app().firestore().collection("users").doc(user).collection('outtasks').doc(strTask).set({
            status: false,
          });
          let elem =
          {
            'Task': strTask,
            'Status': false,
            'Email': user
          }
          console.log(elem);
          //setTasks(elem);
          tasksMap.push(elem);
        }
      });
      if(i == (results.length - 1)){
        console.log('hello');
        setTasks(tasksMap);
      }
    }
  };

  const getEmail = async () => {
    const val = await AsyncStorage.getItem("@user_data").catch(console.log);
    const json = JSON.parse(val);

    //setEmail(json.user.email);
    //alert(email);
    return json.user.email;
  };

  const getTasks = async () => {
    try {
      let { jwt } = await getData();
      const request = await axios.get("http://3.19.67.76:1337/out-processings", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      let user = await getEmail();
      //alert(email);
      //console.log(request.data);

      checkTasks(request.data, user)
      

      /*results.map(function (task) {
        let elem = await checkTasks(task, email);
        taskMap.push(elem);
      });
      console.log('end');
      taskMap.forEach((elem) => {
        console.log(elem);
      })*/
      //
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handlePress = (cStatus, task, email) => {
    console.log(email);
    console.log(cStatus);
    var nStatus = !cStatus;
    Firebase.app().firestore().collection("users").doc(email).collection('outtasks').doc(task).set({
      status: nStatus,
    });
    getTasks();
  };

  return (
    <View style={styles.container}>
      {tasks.map(({Task, Status, Email}) => (
          //<Text>{type}</Text>
          <CheckBox style={styles.checkBox} key={Task} title={Task} checked={Status} onPress={() => handlePress(Status, Task, Email)} />
      ))}
    </View>
  );
}
