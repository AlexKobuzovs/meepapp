import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandler = () => {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/*meep logo*/}
      <Image style={styles.logo} source={require('../assets/badlogo.png')}/>

      {/*Email input box*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      {/*Password input box*/}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      {/*Forgot password and create account button*/}
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.register_button}>Dont have an account?</Text>
      </TouchableOpacity>

      {/*Login button*/}
      <TouchableOpacity style={styles.loginBtn} onPress={pressHandler}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

// Constants
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderColor: "#A9A9A9",
    borderWidth: 2,
    width: "70%",
    height: 45,
    marginBottom: 20,
    textAlign: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    paddingRight: 30,
    marginLeft: 20,
    width: '96%',
    alignItems: "center"
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  register_button: {
    height: 30,
    marginBottom: 0,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8E94F2",
  },

  logo: {
    height: 200,
    width: 400,
    paddingBottom: 40
  }
});