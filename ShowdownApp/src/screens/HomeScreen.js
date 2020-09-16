import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Platform } from "expo-core";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenComponent from '../components/home/HomeScreenComponent';

const Stack = createStackNavigator();

export default function HomeScreen() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginName, setLoginName] = useState("Login");
  const [modalVisible, setModalVisible] = useState(false);

  function doLogin(){
    setModalVisible(true);
    // setLoginStatus(true);
    // setLoginName("TestName");
  }

  function doLogout(){
    
    setModalVisible(false);
    // setLoginStatus(false);
    // setLoginName("Login");
  }

  
  var loginData = {
    loginName: loginName,
    loginStatus: loginStatus
  }
  return (
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          options={{
            title: 'Pokémon Showdown',
            headerStyle: {
              backgroundColor: '#5f0061',
            },
            headerTitleAlign: "left",
            headerTintColor: '#fff',
            headerRight: () => (
              <Button
                onPress={() => {
                  doLogin();
                }}
                title={loginName}
                color="#bb82bd"
              />
            ),
            headerRightContainerStyle: {
              marginEnd: 10
            }
          }}
        >
          {props => <HomeScreenComponent {...props} loginData={loginData} modalVisible={modalVisible} doLogout={doLogout} />}

        </Stack.Screen>
      </Stack.Navigator>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});