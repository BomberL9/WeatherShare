import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from './screens/Login';
import BottomTabNavigator from './components/BottomTabNavigator';

import * as Font from "expo-font";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat";

const Stack = createStackNavigator();

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async loadFonts(){
    await Font.loadAsync({
      Montserrat_500Medium: Montserrat_500Medium
    });
    this.setState({fontLoaded: true});
  }

  componentDidMount(){
    this.loadFonts();
  }

  render(){
    const {fontLoaded} = this.state;
    
    if(fontLoaded){
      return(
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="System" component={BottomTabNavigator}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return null;
  }
}