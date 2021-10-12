import React, { useEffect, useState } from "react";
import { View } from "react-native"
import { useRoute } from "@react-navigation/core";
import firestore from "@react-native-firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat";
import auth from "@react-native-firebase/auth";

const Chat = () => {
    const route = useRoute()
    const [messages, setMessages] = useState([])
    const [userUid, setUserUid] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        return auth().onAuthStateChanged(user => {
            setUserUid(user?.uid)
            setName(user?.displayName)
        })
    }, [])

    useEffect(() => {
        return firestore()
          .doc('chats/' + route.params.chatId)
          .onSnapshot((snapshot => {
            setMessages(snapshot.data()?.messages ?? [])
        }))
    }, [route.params.chatId])

    const onSend = (m = []) => {
        firestore()
          .doc('chats/' + route.params.chatId)
          .set({
              messages:GiftedChat.append(messages, m)
          },
            {merge:true})
    }

    return (
      <View style={{flex:1, backgroundColor:'white'}}>
          <GiftedChat
            messages={messages.map(x => ({...x, createdAt: x?.createdAt?.toDate()}))}
            onSend={messages => onSend(messages)}
            user={{
                _id: userUid,
                name:name
            }}
          />
      </View>
    )
}

export default Chat
