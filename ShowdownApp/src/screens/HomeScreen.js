import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { Platform } from "expo-core";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenComponent from '../components/home/HomeScreenComponent';
import { submitCheckUsernameRequest } from '../utilities/Network'
import { sendWsMessage } from '../utilities/DataTools'

const Stack = createStackNavigator();

export default function HomeScreen({updateUser, challStr, socket}) {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginName, setLoginName] = useState("Login");
  const [modalVisible, setModalVisible] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [didEnterUsername, setDidEnterUsername] = React.useState(false);
  
  useEffect(() => {
    // if(updateUser && updateUser.name.toLowerCase().includes("Guest ")){
    //   setLoginName("Login");
    // }
  });

  function showdownLogin(username,password){
    setLoginStatus(true);
  }

  async function doLogin(username, password){
    if(!checkUsername(username)){
      return false;
    }

    if (!(password && 0 !== password.length)) {
      alert('This account has been registered. Please enter the password.');
      return false;
    }

    showdownLogin(username, password);
    setLoginName(username);

    return true;
  }

  function doLogout(){
    setLoginStatus(false);
    setLoginName("Login");
  }

  async function checkUsername(username){
    if (!(username && 0 !== username.length 
      && username.toLowerCase() !== 'login' 
      && loginData.loginName.toLowerCase() === 'login')) {
      alert("Null or invalid username. Please enter a valid username.")
      return false;
    } else {
      setDidEnterUsername(true);
      
      if(challStr){
        let response = await submitCheckUsernameRequest(username, challStr);
        
        if (response.includes('/trn')){

          // socket.send(JSON.stringify({'msg': response}));
          sendWsMessage(socket, response, 0);
          console.log("sent");
        }
      }


      setUsernameExists(true);
      return true;
    }
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
            loginData={loginData} 
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