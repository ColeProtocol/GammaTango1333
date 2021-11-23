import React, { Component, useLayoutEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import AddChatScreen from './AddChatScreen';
import * as Firebase from "firebase";
import { CheckBox } from 'react-native-elements';
import RectButton from "../../components/RectButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";


/**USER LIST
 * This screen shows all the users in the firestore database.
 * It also includes a search bar so that users can search for
 * specific people.
 */

class UserList extends Component {
  constructor(props) {
    super(props);
    this.firestoreRef = Firebase.firestore().collection('users');
    this.state = {
      loading: false,
      data: [],
      error: null,
    };
    this.arrayholder = [];
    this.userList = [];
    this.allUsers = [];
    
    const getData = async () => {
      const val = await AsyncStorage.getItem("@user_data").catch(console.log);
      const json = JSON.parse(val);
      console.log(json.user.email);
      console.log(json.user.username);
      
      var email = json.user.email;
      this.userList[0]  = email;
    };
    getData();
  }
  
  


  goToNextScreen = () => {
    //const navigation = useNavigation();
    navigation.navigate("AddChatScreen");
    
    //navigation.navigate(AddChatScreen);
  }

  componentDidMount() {
    //this.makeRemoteRequest();
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
 
  getCollection = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((res) => {
      const { username, userEmail, title, battalion, name } = res.data();
      console.log(userEmail)
      var displayName = title + " " + name + " " + battalion;
      this.allUsers.push({
        key: res.id,
        res,
        username: displayName,
        userEmail,
        status: false
      })
      data.push({
        key: res.id,
        res,
        username: displayName,
        userEmail,
        status: false
      });
    });

    this.setState({
      data,
      isLoading: false,
    });
    
  }

  renderSeparator = () => {
    this.props.navigation.setOptions({
      title: "User List",
      //headerBackTitle: "Chats",
      headerRight: null,
      headerLeft: () => (
          <TouchableOpacity 
              style={{ marginLeft: 10}}
              onPress={this.props.navigation.goBack}    
          >
              <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
      ), //back button
    })
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    
    this.setState({
      value: text,
    });
    if(text == ""){
      var newData = this.allUsers;
      
       console.log("here")
    }else{
      var newData = this.state.data.filter(item => {
        const itemData = `${item.username.toUpperCase()}`;
        const textData = text.toUpperCase();
  
        return itemData.indexOf(textData) > -1;
      });
      
    }
    this.setState({
      data: newData,
    }); 
       
  };
  
  handlePress = (email, i) => {
    var index = this.state.data.indexOf(i);
    if(this.state.data[index].status == false){
      this.userList.push(email);
    }else{
      this.userList.splice(this.userList.indexOf(email), 1);
    }
    this.state.data[index].status = !this.state.data[index].status;
    //i.status = true;
    
    console.log(this.userList);
    console.log('check status: ', this.state.data[index].status);
    this.setState({
      data: this.state.data,
    });
  };

  handleSearchCancel = () => {console.log("cancel"); this.searchFilterFunction("")};
  handleSearchClear = () => {
    console.log("clear"); 
    //this.searchFilterFunction("");
    this.setState({value: ''});

  }; // maybe differentiate between cancel and clear

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
        onCancel={this.handleSearchCancel}
        onClear={this.handleSearchClear}
      />
    );
  };

  render() {
    //const navigation = useNavigation();
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    const styles = StyleSheet.create({
      checkBox: {
        width: 300,
      },
      button:{
        width: '90%'
      }
    });

    return (

      <View style={{ flex: 1 }}>
        <RectButton
              text={"Start Chat"}
              style={styles.button}
              onPress={() => 
                this.props.navigation.navigate("AddChatScreen", { userList: this.userList })
              }
            />
        <FlatList
          data={this.state.data}
          extraData={this.state.data}
          renderItem={({ item }) => (
          <TouchableHighlight>
            <CheckBox style={styles.checkBox} key={item.userEmail} title={item.username} checked={this.state.data[this.state.data.indexOf(item)].status} onPress={() => this.handlePress(item.userEmail, item)} />
            
            </TouchableHighlight>
          )}
          keyExtractor={item => item.username}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default UserList;

