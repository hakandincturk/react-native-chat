import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {Avatar, Title, Subheading, Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth'

const Settings = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setName(user?.displayName ?? '')
      setEmail(user?.email ?? '')
    })
  }, [])

    return(
      <View style={{alignItems: 'center', marginTop:16}}>
          <Avatar.Text label={name.split(' ').reduce((prev, current) => prev + current[0], "")} />
          <Title>{name}</Title>
          <Subheading>{email}</Subheading>
          <Button onPress={() => auth().signOut()}>Sign Out</Button>
      </View>
    )
}

export default Settings
