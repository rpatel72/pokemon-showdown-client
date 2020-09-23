import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Platform } from "expo-core";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenComponent from '../components/home/HomeScreenComponent';
import { submitCheckUsernameRequest, submitLoginRequest } from '../utilities/Network'
import { sendWsMessage } from '../utilities/DataTools'
import { updateElementAccess } from 'typescript';


const Stack = createStackNavigator();

export default function HomeScreen({updateUser, challStr, socket}) {
  const [loginName, setLoginName] = useState("Login");
  const [loginStatus, setLoginStatus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [didEnterUsername, setDidEnterUsername] = React.useState(false);
  
  useEffect(() => {
    console.log("Homescreen side:");
    console.log(updateUser);
    console.log(loginName);
    if(updateUser && updateUser.name){
      if(updateUser.name.toLowerCase().includes('guest')){
        setLoginName("Login")
      } else {
        setLoginName(updateUser.name)
      }
    }
  });

  function showdownLogin(username, password){
    setLoginStatus(true);
  }

  async function doLogin(username, password){
    var uExists = await checkUsername(username);
    if(!uExists){
      console.log("TEST1");
      return true;
    }
    console.log("TEST2");

    if (!password || 0 === password.length) {
      alert('This account has been registered. Please enter the password.');
      return false;
    } else {
      let response = await submitLoginRequest(username, password, challStr);
      console.log("TEST7");
      // console.log(response);
      if (response.includes('/trn')){
        console.log(response);
        sendWsMessage(socket, response, 0);
        setLoginStatus(true);
      }
    }

    return false;
  }

  function doLogout(){
    setLoginStatus(false);
    setLoginName("Login");
    sendWsMessage(socket, '//logout', null);
  }

  //return true if exists, false if not
  async function checkUsername(username){
    if (!(username && 0 !== username.length 
      && !username.toLowerCase().includes('guest'))) {
      alert("Null or invalid username. Please enter a valid username.")
      return false;
    } else {
      setDidEnterUsername(true);
      
      if(challStr){
        let response = await submitCheckUsernameRequest(username, challStr);
        if(response.includes("login:authrequired")){
          console.log("TEST3");
          console.log("Need to sign in with password");
          setUsernameExists(true);
          return true;
        }

        if (response.includes('/trn')){
          console.log(response);
          sendWsMessage(socket, response, 0);
          setLoginStatus(true);
        }
      }

      console.log("TEST4");
      return false;
    }
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
                  setModalVisible(true);
                }}
                title={loginName}
                color={loginStatus ? "#bb82bd" : "#fff"}
              />
            ),
            headerRightContainerStyle: {
              marginEnd: 10
            }
          }}
        >
          {props => <HomeScreenComponent {...props} 
            loginName={loginName} 
            loginStatus={loginStatus}
            modalVisible={modalVisible} 
            setModalVisible={setModalVisible} 
            doLogin={doLogin} 
            doLogout={doLogout}
            checkUsername={checkUsername}
            didEnterUsername={didEnterUsername}
            usernameExists={usernameExists}  />}

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