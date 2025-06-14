import {View} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useAuth} from '../contexts/AuthContext';
import {ROUTES} from '../constants/routes';
import LoginScreen from '../screens/LoginScreen';
import {RootStackParamList} from '../types/navigation';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoadingScreen = () => (
  <View flex={1} justifyContent="center" alignItems="center">
    <ActivityIndicator size="large" color="#007AFF" />
  </View>
);

const STACK_NAVIGATOR_OPTIONS = {
  headerShown: false,
};

export const AppNavigator = () => {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? ROUTES.MAIN : ROUTES.LOGIN}
        screenOptions={STACK_NAVIGATOR_OPTIONS}>
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.MAIN} component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
