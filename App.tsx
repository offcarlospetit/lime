import React from 'react';
import AppNavigation from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './src/user';

type Props = {};

const App = (props: Props) => {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
