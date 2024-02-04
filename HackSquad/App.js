// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AuthOptionsScreen from './AuthOptionsScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import OptionsScreen from './OptionsScreen';
import EnterUPIScreen from './EnterUPIScreen';
import ReportScreen from './ReportScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AuthOptions" component={AuthOptionsScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="EnterUPI" component={EnterUPIScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        {/* ... other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
