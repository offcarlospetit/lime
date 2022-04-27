import React from 'react';
import AppNavigation from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './src/user';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type Props = {};

const App = (props: Props) => {
  return (
    <UserProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <AppNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
