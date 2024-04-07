import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPlayer from "./player/MainPlayer";
import SongPlayList from "./PlayList/SongPlayList";
import User from "./setpath/User";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2_Icon3 from "react-native-vector-icons/FontAwesome";
import { StatusBar, StyleSheet } from "react-native";
//  this line of code help to make responshiv view of all app
import { responsiveHeight } from "react-native-responsive-dimensions";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Permiss from "./Permiss";

const Botmtab = createBottomTabNavigator();

function MyTabs() {
  const sizeOfBttomIcone = responsiveHeight(3);
  return (
    <Botmtab.Navigator
      screenOptions={{
        tabBarStyle: { height: hp(7.2), width: wp(100), backgroundColor: "#192f6a" },
        tabBarShowLabel: false,
        headerShown: false,
      }}
      tabBarIconStyle={{
        activeTintColor: "green", // Color for the active tab icon
        inactiveTintColor: "#fff", // Color for the inactive tab icons
      }}
    >
      <Botmtab.Screen
        name="Home"
        component={MainPlayer}
        options={{
          tabBarLabel: "Music",
          tabBarIcon: ({ color, focused }) => (
            <Icon name="headphones-alt" size={sizeOfBttomIcone} color={focused ? "green" : "#fff"} />
          ),
        }}
      />
      <Botmtab.Screen
        name="Playlist"
        component={SongPlayList}
        options={{
          tabBarLabel: "Playlist",
          tabBarIcon: ({ color, focused }) => (
            <Icon2_Icon3 name="tasks" size={sizeOfBttomIcone} color={focused ? "green" : "#fff"} />
          ),
        }}
      />
      <Botmtab.Screen
        name="User"
        component={User}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color, focused }) => (
            <Icon2_Icon3 name="user-o" size={sizeOfBttomIcone} color={focused ? "green" : "#fff"} />
          ),
        }}
      />
    </Botmtab.Navigator>
  );
}


export default function App() {
  return (
    <Permiss>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#4c669f" />
        <MyTabs />
      </NavigationContainer>
    </Permiss>
  );
}
const style = StyleSheet.create({
  optionMainView: {
    height: hp(7.5),
    width: wp(20),
  },
});
