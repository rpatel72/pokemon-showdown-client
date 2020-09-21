import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import BattleScreen from './src/screens/BattleScreen'
import { generateWSString } from './src/utilities/Network'
import { parseIncomingData } from './src/utilities/DataTools'
import SockJS from 'sockjs-client';
require('./src/utilities/BattleTextParser');


// console.log(global.BattleTextParser.parseNameParts);

const Tab = createBottomTabNavigator();
const wsString = generateWSString();
console.log(wsString);
var ws = new SockJS('https://sim3.psim.us/showdown', [], {timeout: 5 * 60 * 1000});


ws.onopen = () => {
  console.log("Connected"); 
};


ws.onerror = (e) => {
  console.log(e.message);
};

ws.onclose = (e) => {
  console.log(e.code, e.reason);
};

export default function App() {
  const [updateUser, setUpdateUser] = useState({});
  const [challStr, setChallStr] = useState({});

  useEffect(() => {
    ws.onmessage = (e) => {
      var data = e.data.replace('a["', '').replace('"]', '');
      console.log(" ");
      console.log(data);
      var dataArray = data.split("\\n")
      // console.log(dataArray.length);

      for (var dataString of dataArray){
        // console.log("DATASTRING");
        // console.log(dataString);
        var initialConfig = parseIncomingData(dataString);

        if(initialConfig){
          if('updateuser' in initialConfig) {
            setUpdateUser(initialConfig.updateuser);
          } else if ('challstr' in initialConfig){
            setChallStr(initialConfig.challstr);
          } else {
            console.log(initialConfig);
          }
          
        }
      }
    };
  });

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" children={()=><HomeScreen updateUser={updateUser} challStr={challStr} socket={ws}/>} />
        <Tab.Screen name="Battle" component={BattleScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
