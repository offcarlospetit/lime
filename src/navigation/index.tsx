import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import { UserContext } from '../user/context';

export type HomeStackParamList = {
    HomeStack: any;
    LoginStack: any;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function AppNavigation() {
    const userContext = useContext(UserContext);
    const { user } = userContext;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"LoginStack"}>
            {
                user ? (
                    <Stack.Screen name="HomeStack" component={HomeStack} />
                ) : (
                    <Stack.Screen name="LoginStack" component={LoginStack} />
                )
            }
        </Stack.Navigator>
    );
}