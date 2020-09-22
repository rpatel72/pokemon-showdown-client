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

export default function HomeScreenComponent({navigation, loginName, loginStatus, modalVisible, 
  setModalVisible, doLogin, doLogout, checkUsername, didEnterUsername, usernameExists}) {

  const [usernameValue, onChangeUsernameText] = React.useState('');
  const [passwordValue, onChangePasswordText] = React.useState('');
  let isLoggedIn = (loginStatus && loginName != "Login");

  var headerText = isLoggedIn ? "You are currently logged in as " + loginName + "." : "You are not currently logged in."

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
            <View style={{ flexDirection:"row" , marginTop: 10}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "green", marginRight: 5 }}
                onPress={() => {
                  doLogout()
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginHorizontal: 5 }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
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
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "90%", padding: 3, marginBottom: 10}}
              onChangeText={text => onChangeUsernameText(text)}
              onSubmitEditing={(e) => {
                if (doLogin(usernameValue.trim(), passwordValue.trim())) {
                  setModalVisible(false);
                }
              }}
              value={usernameValue}
            />


            { didEnterUsername && usernameExists ? 
              <View style={{width: "100%"}}>
                <Text style={styles.modalChooseNameText}>Enter Password:</Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "90%", padding: 3, marginBottom: 10}}
                  onChangeText={text => onChangePasswordText(text)}
                  onSubmitEditing={(e) => {
                    if (doLogin(usernameValue.trim(), passwordValue.trim())) {
                      setModalVisible(false);
                    }
                  }}
                  secureTextEntry={true}
                  value={passwordValue}
                /> 
              </View>
                : null
            }
            <View style={{ flexDirection:"row" }}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "green", marginRight: 5 }}
                onPress={() => {
                  if (doLogin(usernameValue.trim(), passwordValue.trim())) {
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.textStyle}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", marginHorizontal: 5 }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
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
    textAlign: "left",
    marginBottom: 5
  }
});
