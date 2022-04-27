import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register } from '../user';

export type LoginStackParamList = {
    Login: any;
    Register: any;
};

const Stack = createNativeStackNavigator<LoginStackParamList>();


const LoginStack = () => {

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        </Stack.Navigator>
    );
}

export default LoginStack;