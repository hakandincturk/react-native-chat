/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatList from "./screens/ChatList";
import Settings from "./screens/Settings";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import { Icon } from "react-native-elements";
import { Provider } from "react-native-paper";
import auth from "@react-native-firebase/auth";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation()
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if(!user) navigation.navigate('SignUp')
    })
  }, [])

  return(
    <Tabs.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        return <Icon name={route.name === "ChatList" ? "chatbubbles" : "settings"} type="ionicon" color={color}
                     size={size} />;
      },
    })}>
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  )
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen name="main" component={TabsNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SignUp" component={SignUp} options={{presentation: "fullScreenModal"}}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{presentation: "fullScreenModal"}}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
