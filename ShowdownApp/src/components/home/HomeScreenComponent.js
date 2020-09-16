import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from "react-native";

export default function HomeScreenComponent({navigation, loginData, modalVisible, doLogout}) {
  const [userNameValue, onChangeUsernameText] = React.useState('');
  let isLoggedIn = (loginData.loginStatus && loginData.loginName != "Login");

  var headerText = isLoggedIn ? "You are currently logged in as " + loginData.loginName + "." : "You are not currently logged in."
  
  return (
    <View style={styles.centeredView}>
      {isLoggedIn ? 
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{headerText}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={doLogout}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> 
      :
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeaderText}>{headerText}</Text>
            <Text style={styles.modalChooseNameText}>Choose name:</Text>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "80%", padding: 3, margin: 10}}
              onChangeText={text => onChangeUsernameText(text)}
              value={userNameValue}
            />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={doLogout}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    width: "80%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalHeaderText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalChooseNameText: {
    textAlign: "left"
  }
});
