import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Subheading } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import auth from "@react-native-firebase/auth";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const createAccount = async () => {
    setIsLoading(true)
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      await response.user.updateProfile({ displayName: name });
      setIsLoading(false)
      navigation.popToTop()
    }
    catch (e) {
      setIsLoading(false)
      console.warn(e.message)
      setError(e.message)
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading style={{color:'red', textAlign:"center", marginBottom: 16, }}>Error: {error}</Subheading>
      )}
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)} />
      <TextInput
        label="Email"
        style={{ marginTop: 12 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType='email-adress'
      />
      <TextInput
        label="Password"
        style={{ marginTop: 12 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
      }}>
        <Button compact onPress={() => navigation.navigate('SignIn')}>SIGN IN</Button>
        <Button mode="contained" disabled={name === '' || email === '' || password === ''} onPress={() => createAccount()} loading={isLoading}>SIGN UP</Button>
      </View>
    </View>
  );
};

export default SignUp;
