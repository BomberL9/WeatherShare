import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Weather from "../screens/Weather";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component{
    render(){
        return(
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if(route.name === "Clima"){
                            iconName = "cloud";
                        }
                        return <Ionicons name ={iconName} size ={size} color ={color}/>     
                    },
                    tabBarStyle:{
                        backgroundColor: '#93CAED',
                        opacity: 0.7,
                        borderRadius: 7
                    },
                    headerShown: false
                })}>
                    <Tab.Screen name="Clima" component={Weather}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}