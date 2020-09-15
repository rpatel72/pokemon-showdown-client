import * as React from 'react';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { Platform } from "expo-core";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenComponent from '../components/home/HomeScreenComponent';

const Stack = createStackNavigator();



export default function HomeScreen() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginName, setLoginName] = useState("Login");

  function doLogin(){
    setLoginStatus(true);
    setLoginName("TestName")
  }

  function doLogout(){
    setLoginStatus(false);
    setLoginName("Login")
  }

  
  var loginData = {
    loginName: "loginName",
    loginStatus: loginStatus
  }
  return (
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          options={{
            title: 'Pokémon Showdown',
            headerStyle: {
              backgroundColor: '#5f0061'
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Button
                onPress={doLogin}
                title={loginName}
                color="#bb82bd"
              />
            ),
            headerRightContainerStyle: {
              margin: 10
            }
          }}
        >
          {props => <HomeScreenComponent {...props} loginData={loginData} />}

        </Stack.Screen>
      </Stack.Navigator>

  );
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };