import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {useAuthStore} from '../../state/useAuthStore';

import Tabs from './Tabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const {user, setUser, isLoading, setLoading} = useAuthStore();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f2133'}}>
        <ActivityIndicator size="large" color="#4dabf7" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!user ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </>
          ) : (
            <Stack.Screen name="Tabs" component={Tabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
