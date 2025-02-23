import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.jsx';
import OnboardingScreen from '../screens/OnboardingScreen.jsx';
import {getItem} from '../utils/asyncStorage.js';
import TodosScreen from '../screens/TodosScreen.jsx';
import Example from '../example.jsx';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  //   showOnboarding, onboarding ekranını gösterip göstermeyeceğinizi kontrol eden bir state'dir.
  // Başlangıç değeri null, çünkü henüz kullanıcının onboarding sürecini tamamlayıp tamamlamadığı bilinmiyor.
  // setShowOnboarding, bu state'i güncellemek için kullanılan fonksiyondur.
  const [showOnboarding, setShowOnboarding] = useState(null);
  //   useEffect hook'u, bileşen yüklendiğinde (ilk render) checkIfAlreadyOnboarded fonksiyonunu çağırır. Yani, uygulama başlatıldığında hemen kullanıcının onboarding sürecini tamamlayıp tamamlamadığını kontrol eder.
  // Bu sadece bir kez çalışır ([] boş bağımlılık dizisi ile).
  useEffect(() => {
    //Bu, kullanıcının onboarding sürecini tamamlayıp tamamlamadığını kontrol eden asenkron fonksiyondur.
    checkIfAlreadyOnboarded();
  }, []);

  //   getItem('onboarded') fonksiyonu ile AsyncStorage'dan 'onboarded' anahtarıyla kayıtlı veriyi alır. Bu veriye göre kullanıcı onboarding ekranını daha önce görmüş mü görmemiş mi anlarız.
  // Eğer kullanıcı onboarding sürecini daha önce tamamladıysa bu değer 1 olur.
  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    //Eğer onboarded değeri 1 ise, yani kullanıcı onboarding'i tamamlamışsa:
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnboarding == null) {
    return null;
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Todo"
            options={{headerShown: false}}
            component={TodosScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Onboarding"
            options={{headerShown: false}}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Todo"
            options={{headerShown: false}}
            component={TodosScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
