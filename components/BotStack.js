import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Youtube from "../scr/Youtube";
// import Firebase from "../scr/Firebase"; // ScrollView로 된 페이지
import FireFlat from "../scr/FireFlat";
import Likepage from "../scr/Flatbase";
import TestPage from "../scr/TestPage";
import HomePage from "../scr/Flatbase";

// TabStack은 TabBar를 만드는 네비게이션옵션을 선언해준거다.
// webviewStack은 webview를 StackNavigation해주기 위해 선언해준거다.
// 그밖의 Stack옵션을 넣어주고 싶은 화면은 FBStack쓰면 된다.
const TabStack = createBottomTabNavigator();
const webviewStack = createStackNavigator();
const FBStack = createStackNavigator();
const TestStack = createStackNavigator();

// 일반 화면을 stackscreen화 시키기 위해 선언하는 곳
// 마찬가지로 나중에 TabBar에 심을 화면중 하나다.
const FBStackScreen = () => {
    return (
        <FBStack.Navigator>
            <FBStack.Screen
                name="about"
                component={FireFlat}
                options={{ headerShown: false }}
            />
        </FBStack.Navigator>
    );
};

// webView화면을 Stackscreen화 시키기 위해 선언하는 곳
// 나중에 TabBar에 심을 화면중 하나다.
// stackscreen화 시켜야 stacknavigation이 화면을 쌓는방식으로 작동된다.
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


//HomeTab으로 외부 쿼리 연동할 곳
const HomeStackScreen = () => {
    return (
        <FBStack.Navigator>
            <FBStack.Screen
                name="about"
                component={HomePage}
                options={{ headerShown: false }}
            />
        </FBStack.Navigator>
    );
};


//플레이리스트 찜하기 구현할 곳
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


// 화면Test용 page 입니당---------------------------------------
const TestScreen = () => {
    return (
        <TestStack.Navigator>
            <TestStack.Screen
                name="Test"
                component={TestPage}
                options={{ headerShown: false }}
            />
        </TestStack.Navigator>
    );
};



// 아래쪽 탭을 만들어주는 navigation. 위에서 선언해서 만들어 놓은 stackScreen들을 받아와서 구성한다.
// 새로만들어주고 싶다면 아래 코드를 복붙하고, name을 선언해주고,
// component는 새로 선언해둔 stackscreen을 가져와주고, tabBarLabel로 원하는대로 탭이름 설정해주고,
// MaterialCommunityIcons name으로 원하는 아이콘 설정해주자.
const TabStackScreen = () => {
    return (
        <TabStack.Navigator screenOptions={{ tabBarActiveTintColor: '#e91e63' }}>
            <TabStack.Screen name="자체 데이터베이스" component={FBStackScreen} options={{ tabBarLabel: 'Firebase', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cloud" color={color} size={size} />), }} />
            <TabStack.Screen name="웹뷰" component={YoutubeStackScreen} options={{ tabBarLabel: 'Youtube', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="youtube" color={color} size={size} />), }} />
            <TabStack.Screen name="외부 검색" component={HomeStackScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />), }} />
            <TabStack.Screen name="좋아요 페이지" component={LikeStackScreen} options={{ tabBarLabel: 'Like', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="star" color={color} size={size} />), }} />
            <TabStack.Screen name="Test 페이지" component={TestScreen} options={{ tabBarLabel: 'TestRoom', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account" color={color} size={size} />), }} />
        </TabStack.Navigator>
    );
};

export default TabStackScreen;