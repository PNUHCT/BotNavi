import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Youtube from "../scr/Youtube";
import Firebase from "../scr/Firebase";
import Likepage from "../scr/Flatbase";



const TabStack = createBottomTabNavigator();
const webviewStack = createStackNavigator();
const FBStack = createStackNavigator();

//useEffect로 Firebase 화면 구성해주기


const YoutubeStackScreen = () => {
    return (
        <webviewStack.Navigator>
            <webviewStack.Screen
                name="home"
                component={Youtube}
                options={{
                    headerShown: false
                }}
            />
        </webviewStack.Navigator>
    );
};
const FBStackScreen = () => {
    return (
        <FBStack.Navigator>
            <FBStack.Screen
                name="about"
                component={Firebase}
                options={{ headerShown: false }}
            />
        </FBStack.Navigator>
    );
};

//useEffect 만들어주기 => 처음엔 기본목록화면 => 검색시 검색한 리스트화면 ; 영상선택시, iframe+리스트화면

const LikeStackScreen = () => {
    return (
        <FBStack.Navigator>
            <FBStack.Screen
                name="about"
                component={Likepage}
                options={{ headerShown: false }}
            />
        </FBStack.Navigator>
    );
};

const TabStackScreen = () => {
    return (
        <TabStack.Navigator screenOptions={{ tabBarActiveTintColor: '#e91e63' }}>
            <TabStack.Screen name="외부" component={YoutubeStackScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />), }} />
            <TabStack.Screen name="내부" component={FBStackScreen} options={{ tabBarLabel: 'Updates', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="bell" color={color} size={size} />), }} />
            <TabStack.Screen name="Like" component={LikeStackScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />), }} />
        </TabStack.Navigator>
    );
};

export default TabStackScreen;