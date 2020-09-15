import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

function HomeScreenComponent({ navigation, loginData }) {
  // const [loginStatus, setLoginStatus] = useState(currentLoginStatus);

  var loginText = loginData.loginStatus &&  loginData.loginName != "Login" ? "You're now logged in as " + loginData.loginName + "." : "Not logged in."
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{loginText}</Text>
    </View>
  );
}

export default HomeScreenComponent;