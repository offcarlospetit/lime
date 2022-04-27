import * as React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddScreen, Home, Detail } from '../home';
import { Todo } from '../home/types';

export type HomeStackParamList = {
    Home: any;
    New: any;
    Detail: {
        docId: number;
    }
};

const Stack = createNativeStackNavigator<HomeStackParamList>();


const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="New" component={AddScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Detail" component={Detail} />
        </Stack.Navigator>
    );
}

export default HomeStack;