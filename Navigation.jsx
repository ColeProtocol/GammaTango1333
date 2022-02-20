import * as React from "react";
import { StatusBar, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";

// custom icons
import IcomoonConfig from "./assets/icomoon/selection.json";
import MyIcon from "./assets/icomoon/iconConfig";
import NavbarConfig from "./assets/icomoon/navbar-icons/selection.json";
import NavbarIcons from "./assets/icomoon/navbar-icons/navbarConfig";

// tabs
import Colors from "./constants/Colors";
import HubTab from "./tabs/HubTab";
import NewsTab from "./tabs/NewsTab";
import CmdTab from "./tabs/CmdTab";
import GameTab from "./tabs/GameTab";
import AccountTab from "./tabs/otherScreens/AccountTab";
import UserProfile from "./tabs/UserProfile";

// hub screens
import BattScreen from "./tabs/hubScreens/BattScreen";
import MapScreen from "./tabs/hubScreens/MapScreen";
import ForumsScreen from "./tabs/hubScreens/ForumScreen";
import ResourcesScreen from "./tabs/hubScreens/ResourcesScreen";
import HistoryScreen from "./tabs/hubScreens/HistoryScreen";
import SchoolsScreen from "./tabs/hubScreens/SchoolsScreen";
import HandbookScreen from "./tabs/hubScreens/HandbookScreen";
import ProcessingScreen from "./tabs/hubScreens/ProcessingScreen";
import InProcessing from "./tabs/hubScreens/InProcessing";
import OutProcessing from "./tabs/hubScreens/OutProcessing";
import RakFitScreen from "./tabs/hubScreens/RakFitScreen";
import ResourcesPDF from "./tabs/hubScreens/ResourcesPDF";
import CalendarScreen from "./tabs/hubScreens/CalendarScreen";
import VideoScreen from "./tabs/hubScreens/VideoScreen";
import ReadingListScreen from "./tabs/hubScreens/ReadingListScreen";
import Book1 from "./tabs/hubScreens/Book1";
import Book2 from "./tabs/hubScreens/Book2";
import Book3 from "./tabs/hubScreens/Book3";

// battalion screens
import BattUnitScreen from "./tabs/hubScreens/BattUnitScreen";
import BattNewsScreen from "./tabs/hubScreens/BattNewsScreen";
import BattPolicyScreen from "./tabs/hubScreens/BattPolicyScreen";
import CallRosterScreen from "./tabs/hubScreens/CallRosterScreen";
import BattShopScreen from "./tabs/hubScreens/BattShopScreen";
import BattShopListScreen from "./tabs/hubScreens/BattShopListScreen";
import BattShopContactScreen from "./tabs/hubScreens/BattShopContactScreen";
import BattShopClearanceScreen from "./tabs/hubScreens/BattShopClearanceScreen";
import BattShopRegsScreen from "./tabs/hubScreens/BattShopRegsScreen";
import BattShopFunctionScreen from "./tabs/hubScreens/BattShopFunctionScreen";

import ResourcePageScreen from "./tabs/hubScreens/ResourcePageScreen";
import ResourceDocuments from "./tabs/hubScreens/ResourceDocuments";
import SchoolsPageScreen from "./tabs/hubScreens/SchoolsPageScreen";
import MoH from "./tabs/hubScreens/MoHScreen";
import FallenScreen from "./tabs/hubScreens/FallenScreen";
import LineageHonorsScreen from "./tabs/hubScreens/LineageHonorsScreen";
import NotableEventsScreen from "./tabs/hubScreens/NotableEventsScreen";
import DivisionHistoryScreen from "./tabs/hubScreens/DivisionHistoryScreen";
import DMOR_HMOR_Screen from "./tabs/hubScreens/DMOR_HMOR_Screen";
import The38DEHistoryScreen from "./tabs/hubScreens/The38DEHistoryScreen";
import HistoryDetailScreen from "./tabs/hubScreens/HistoryDetailScreen";

// cmd screens
import OffLimitsScreen from "./tabs/cmdScreens/OffLimitsScreen";
import PolicyLettersScreen from "./tabs/cmdScreens/PolicyLettersScreen";
import VisionScreen from "./tabs/cmdScreens/VisionScreen";
import WelcomeLetterScreen from "./tabs/cmdScreens/WelcomeLetterScreen";
import CmdModal from "./tabs/CmdModal";

// other screens
import WelcomeScreen from "./tabs/otherScreens/WelcomeScreen";
import VidPlay from "./tabs/otherScreens/VidPlay";
import WelcomeVideo from "./tabs/otherScreens/WelcomeVideo";
import CheckList from "./tabs/otherScreens/CheckList";
import NewsScreen from "./tabs/otherScreens/NewsScreen";
import Topics from "./tabs/otherScreens/Topics";
import Posts from "./tabs/otherScreens/Posts";
import NewPost from "./tabs/otherScreens/NewPost";
import NewRequest from "./tabs/otherScreens/NewRequest";
import Preferences from "./tabs/otherScreens/Preferences";
import AccountAvatarList from "./tabs/otherScreens/AccountAvatarList";
import Comments from "./tabs/otherScreens/Comments";
import NewComment from "./tabs/otherScreens/NewComment";
import PostDetail from "./tabs/otherScreens/PostDetail";
import PostReply from "./tabs/otherScreens/PostReply";
import ConstructionScreen from "./tabs/otherScreens/Construction";

//chat screen
//import LoginScreen from "./tabs/chatScreens/LoginScreen";
//import RegisterScreen from "./tabs/chatScreens/RegisterScreen";
import HomeScreen from "./tabs/chatScreens/HomeScreen";
import AddChatScreen from "./tabs/chatScreens/AddChatScreen";
import ChatScreen from "./tabs/chatScreens/ChatScreen";
import UserList from "./tabs/chatScreens/UserList";

// authentication screens
import Login from "./tabs/Login";
import LogOut from "./tabs/LogOut";
import SignUp from "./tabs/SignUp";
import SplashScreen from "./tabs/SplashScreen";
import iconConfig from "./assets/icomoon/iconConfig";
import VideoSaveScreen from "./tabs/hubScreens/VideoSubmitScreen";
import Videos from "./tabs/otherScreens/Videos";
import VidPosts from "./tabs/otherScreens/VidPosts";
//import UserProfile from "./tabs/UserProfile";

const HubStack = createStackNavigator();
function HubStackScreen({ navigation }) {
  return (
    <HubStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25, /*fontFamily: "fira-sans"*/ },
        headerRight: () => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate("Account")}
            title="Account"
            color="#fff"
          />
        ),
      }}
    >
      <HubStack.Screen
        name="Hub"
        component={HubTab}
        options={{ headerLeft: null }}
      />
      <HubStack.Screen name="KMZ Map" component={MapScreen} />
      <HubStack.Screen name="Battalions" component={BattScreen} />
      <HubStack.Screen name="RAK History" component={HistoryScreen} />
      <HubStack.Screen name="Bluebook" component={HandbookScreen} />
      <HubStack.Screen name="Training & Schools" component={SchoolsScreen} />
      <HubStack.Screen name="School" component={SchoolsPageScreen} />
      <HubStack.Screen
        name="Processing"
        component={
          ProcessingScreen
          //ConstructionScreen
        }
      />
      <HubStack.Screen name="In Processing" component={InProcessing} />
      <HubStack.Screen name="Out Processing" component={OutProcessing} />
      <HubStack.Screen
        name="Forum"
        component={
          // ForumsScreen
          ConstructionScreen
        }
      />
      <HubStack.Screen name="Army Resources" component={ResourcesScreen} />
      <HubStack.Screen name="ResourcesPDF" component={ResourcesPDF} />
      <HubStack.Screen
        name="RAKFIT"
        component={
          // RakFitScreen
          //ConstructionScreen
          VidPosts
        }
      />

      <HubStack.Screen
        name="Calendar"
        component={
          // RakFitScreen
          CalendarScreen
        }
      />
      <HubStack.Screen
        name="VideoScreen"
        component={
          // RakFitScreen
          VideoScreen
        }
      />
      <HubStack.Screen
        name="VidPlay"
        component={
          // RakFitScreen
          VidPlay
        }
      />
      <HubStack.Screen
        name = "VideoSave"
        component = {VideoSaveScreen}
        //options = ({headerShown: false})
        />
      <HubStack.Screen
        name = "Videos"
        component = {Videos}
        //options = ({headerShown: false})
        />
      <HubStack.Screen
        name = "VidPosts"
        component = {VidPosts}
        //options = ({headerShown: false})
        />
      <HubStack.Screen
        name="Reading List"
        component={
          // RakFitScreen
          ReadingListScreen
        }
      />
      <HubStack.Screen name="Book1" component={Book1} />
      <HubStack.Screen name="Book2" component={Book2} />
      <HubStack.Screen name="Book3" component={Book3} />

      <HubStack.Screen name="Request a Feature" component={NewRequest} />

      <HubStack.Screen name="Battalion" component={BattUnitScreen} />
      <HubStack.Screen name="Battalion News" component={BattNewsScreen} />
      <HubStack.Screen name="Batt Policies" component={BattPolicyScreen} />
      <HubStack.Screen name="Call Roster" component={CallRosterScreen} />
      <HubStack.Screen name="Batt Shop" component={BattShopScreen} />
      <HubStack.Screen name="Batt Shop List" component={BattShopListScreen} />
      <HubStack.Screen
        name="Batt Shop Contact"
        component={BattShopContactScreen}
      />
      <HubStack.Screen
        name="Batt Shop Clearance"
        component={BattShopClearanceScreen}
      />
      <HubStack.Screen
        name="Batt Shop Regulations"
        component={BattShopRegsScreen}
      />
      <HubStack.Screen
        name="Batt Shop Function"
        component={BattShopFunctionScreen}
      />

      <HubStack.Screen name="Resource" component={ResourcePageScreen} />
      <HubStack.Screen
        name="Resource Documents"
        component={ResourceDocuments}
      />

      <HubStack.Screen name="Topics" component={Topics} />
      <HubStack.Screen
        name="Check List"
        component={CheckList}
        options={
          ({ title: "Check List" },
          { headerLeft: null },
          { headerBackTitleVisible: false })
        }
      />
      <HubStack.Screen name="Posts" component={Posts} />
      <HubStack.Screen name="New Post" component={NewPost} />
      <HubStack.Screen name="Comments" component={Comments} />
      <HubStack.Screen name="New Comment" component={NewComment} />
      <HubStack.Screen name="Post Detail" component={PostDetail} />
      <HubStack.Screen name="Reply Post" component={PostReply} />
      <HubStack.Screen name="MoH" component={MoH} />
      <HubStack.Screen name="HistoryDetails" component={HistoryDetailScreen} />
      <HubStack.Screen name="Lineage Honors" component={LineageHonorsScreen} />
      <HubStack.Screen name="Fallen Rakkasans" component={FallenScreen} />
      <HubStack.Screen name="DMOR_HMOR" component={DMOR_HMOR_Screen} />
      <HubStack.Screen name="Notable Events" component={NotableEventsScreen} />
      <HubStack.Screen
        name="Division History"
        component={DivisionHistoryScreen}
      />
      <HubStack.Screen name="38DE History" component={The38DEHistoryScreen} />
      <HubStack.Screen
        name="Account"
        component={AccountTab}
        options={{ headerLeft: null }}
      />
      <HubStack.Screen
        name="User Profile"
        component={UserProfile}
        options={{ headerLeft: null }}
      />
      <HubStack.Screen name="Preferences" component={Preferences} />
      <HubStack.Screen name="Avatar List" component={AccountAvatarList} />
    </HubStack.Navigator>
  );
}

const NewsStack = createStackNavigator();
function NewsStackScreen({ navigation }) {
  return (
    <NewsStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25, /*fontFamily: "fira-sans"*/ },
        headerBackTitleVisible: false,
        headerRight: () => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate("Account")}
            title="Account"
            color="#fff"
          />
        ),
      }}
    >
      <NewsStack.Screen
        name="News"
        component={NewsTab}
        options={{ headerLeft: null }}
      />
      <NewsStack.Screen
        name="News Article"
        options={{ headerTitle: "News" }}
        component={NewsScreen}
      />
    </NewsStack.Navigator>
  );
}

const CommandStack = createStackNavigator();
function CommandStackScreen({ navigation }) {
  return (
    <CommandStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25, /*fontFamily: "fira-sans"*/ },
        headerBackTitleVisible: false,
        headerRight: () => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate("Account")}
            title="Account"
            color="#fff"
          />
        ),
      }}
    >
      <CommandStack.Screen
        name="Command"
        component={CmdTab}
        options={{ headerLeft: null }}
      />
      <CommandStack.Screen name="Commander" component={CmdModal} />
      <CommandStack.Screen name="Welcome" component={WelcomeScreen} />
      <CommandStack.Screen
        name="Welcome Letter"
        component={
          // WelcomeLetterScreen
          WelcomeLetterScreen
        }
      />
      <CommandStack.Screen
        name="Commanders' Vision"
        component={
          // VisionScreen
          VisionScreen
        }
      />
      <CommandStack.Screen
        name="Policy Letters"
        component={PolicyLettersScreen}
      />
      <CommandStack.Screen
        name="Off Limits"
        component={
          // OffLimitsScreen
          OffLimitsScreen
        }
      />
    </CommandStack.Navigator>
  );
}

const GameStack = createStackNavigator();
function GameStackScreen({ navigation }) {
  return (
    <GameStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25 },
        headerRight: () => (
          <IconButton
            icon="account"
            onPress={() => navigation.navigate("Account")}
            title="Account"
            color="#fff"
          />
        ),
      }}
    >
      <GameStack.Screen
        name="RAK Runner"
        component={GameTab}
        options={{ headerLeft: null }}
      />
    </GameStack.Navigator>
  );
}

const ChatStack = createStackNavigator();
function ChatStackScreen({ navigation }) {
  return (
    <ChatStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25, /*fontFamily: "fira-sans"*/ },
      }}
    >
      {/*       <ChatStack.Screen
        name="Chat"
        component={LoginScreen}
        options={{ headerLeft: null }}
      />
      <ChatStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerLeft: null }}
      /> */}
      <ChatStack.Screen
        name="Chat" //Home
        component={HomeScreen}
        options={{ headerLeft: null }}
      />

      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerLeft: null }}
      />
      <ChatStack.Screen
        name="UserList"
        component={UserList}
        options={{ headerLeft: null }}
      />
      <ChatStack.Screen
        name="AddChatScreen"
        component={AddChatScreen}
        options={{ headerLeft: null }}
      />
    </ChatStack.Navigator>
  );
}

const AccountStack = createStackNavigator();
function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      headerMode="float"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontSize: 25 },
      }}
    >
      <AccountStack.Screen
        name="Account"
        component={AccountTab}
        options={{ headerLeft: null }}
      />
      <AccountStack.Screen name="Log Out" component={LogOut} />
    </AccountStack.Navigator>
  );
}
/*
const AuthStack = createStackNavigator();
function AuthStackScreen() {
  return (

  );
}
      <Stack.Screen name="Account" component={AccountTab} />
      <Stack.Screen name="Log Out" component={LogOut} />
*/

const Tab = createBottomTabNavigator();
function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Hub"
      lazy={true}
      tabBarOptions={{
        style: {
          backgroundColor: Colors.primary,
          paddingTop: 7,
        },
        activeTintColor: Colors.accent,
        inactiveTintColor: Colors.lightGray,
        headerLeft: null,
        headerBackTitleVisible: false,
      }}
      /*

  tabBarOptions={((activeTintColor = Colors.accent),
  (inactiveTintColor = Colors.lightGray))(
    (activeBackgroundColor = { Colors }.primary)
  )}
  */
    >
      <Tab.Screen
        name="News"
        component={NewsStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <NavbarIcons
              name="News"
              color={color}
              size={26}
              config={NavbarConfig}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Command"
        component={CommandStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <NavbarIcons
              name="Group"
              color={color}
              size={26}
              config={NavbarConfig}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Hub"
        component={HubStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MyIcon
              name="cutOutTori"
              color={color}
              size={26}
              config={IcomoonConfig}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Runner"
        component={
          // GameStackScreen
          ConstructionScreen
        }
        options={{
          tabBarIcon: ({ color }) => (
            <NavbarIcons
              name="Runner"
              color={color}
              size={26}
              config={NavbarConfig}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat"
              color={color}
              size={26}
              config={NavbarConfig}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        headerLeft: null,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={
          ({ title: "SplashScreen" },
          { headerLeft: null },
          { headerBackTitleVisible: false })
        }
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={
          ({ title: "Login" },
          { headerLeft: null },
          { headerBackTitleVisible: false })
        }
      />
      <Stack.Screen
        name="Welcome Video"
        component={WelcomeVideo}
        options={
          ({ title: "WelcomeVideo" },
          { headerLeft: null },
          { headerBackTitleVisible: false })
        }
      />

      <Stack.Screen
        name="Tab Bar"
        component={TabBar}
        options={
          ({ title: "Tab Bar" },
          { headerLeft: null },
          { headerBackTitleVisible: false })
        }
      />
    </Stack.Navigator>
  );
}
