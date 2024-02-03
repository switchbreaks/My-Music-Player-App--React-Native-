import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPlayer from './player/MainPlayer';
import SongPlayList from './PlayList/SongPlayList';
import User from './setpath/User';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2_Icon3 from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
//  this line of code help to make responshiv view of all app
import {responsiveHeight,} from "react-native-responsive-dimensions";
import Permiss from './Permiss';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const sizeOfBttomIcone = responsiveHeight(3);
  return (
    
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainPlayer}
        options={{
          tabBarLabel: "Music",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="headphones-alt" size={sizeOfBttomIcone} color={color} />
          )
        }}

      />
      <Tab.Screen name="Playlist" component={SongPlayList}
        options={{
          tabBarLabel: "Playlist",
          headerShown: false,
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <Icon2_Icon3 name="tasks" size={sizeOfBttomIcone} color={color} />
          )
        }}
      />
      <Tab.Screen name="User" component={User}
        options={{
          tabBarLabel: "User",
          headerShown: false,
          headerTintColor: "#fff",
          tabBarIcon: ({ color }) => (
            <Icon2_Icon3 name="user-o" size={sizeOfBttomIcone} color={color} />
          )
        }} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
      <Permiss>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#2e4178" />
          <MyTabs />
        </NavigationContainer>
      </Permiss>
  );
}
