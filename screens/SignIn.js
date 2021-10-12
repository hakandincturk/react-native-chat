import React, { useState } from "react";
import { View } from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import auth from "@react-native-firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const signIn = async () => {
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      console.warn(e.message);
      setError(e.message);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading style={{ color: "red", textAlign: "center", marginBottom: 16 }}>Error: {error}</Subheading>
      )}
      <TextInput
        label="Email"
        style={{ marginTop: 12 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-adress"
      />
      <TextInput
        label="Password"
        style={{ marginTop: 12 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
      }}>
        <Button compact onPress={() => navigation.navigate("SignUp")}>SIGN UP</Button>
        <Button mode="contained" disabled={email === "" || password === ""} onPress={() => signIn()}
                loading={isLoading}>SIGN IN</Button>
      </View>
    </View>
  );
};

export default SignIn;
