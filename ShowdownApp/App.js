import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import BattleScreen from './src/screens/BattleScreen'
import { generateWSString } from './src/utilities/Network'
import SockJS from 'sockjs-client';

require('./src/utilities/BattleTextParser');

const Tab = createBottomTabNavigator();

var ws = new WebSocket(generateWSString());

ws.onopen = () => {
  console.log("Connected"); 
};

ws.onmessage = (e) => {
  console.log(e.data);
};

ws.onerror = (e) => {
  console.log(e.message);
};

ws.onclose = (e) => {
  console.log(e.code, e.reason);
};

function loadBattleTestParser(){
  return;
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" children={()=><HomeScreen ws={ws} />} />
        <Tab.Screen name="Battle" component={BattleScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
