import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TodosScreen from '../screens/TodosScreen';
import SCREENS from '../utils/router';
import {getItem} from '../utils/asyncStorage';

const {HOME, ONBOARDING, TODOS} = SCREENS;
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  const checkIfAllreadyBoarded = async () => {
    let onboarded = await getItem('onboarded');
    setShowOnboarding(onboarded !== '1');
  };
  useEffect(() => {
    checkIfAllreadyBoarded();
  }, []);
  if (showOnboarding === null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={showOnboarding ? ONBOARDING : HOME}>
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen name={ONBOARDING} component={OnboardingScreen} />

        <Stack.Screen name={TODOS} component={TodosScreen} />
      </Stack.Navigator>
    );
  }
};

export default AppNavigation;

const styles = StyleSheet.create({});
