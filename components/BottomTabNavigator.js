import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

export default class BottomTabNavigator extends Component{
    render(){
        return(
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if(route.name === "Início"){
                            iconName = "home";
                        }
                        <Ionicons
                            name = {iconName}
                            size = {size}
                            color = {color}
                        />        
                    }
                })}>
                    <Tab.Screen name="Início" component={Home}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}