import {NavigationContainer} from '@react-navigation/native';
import {View, Text, SafeAreaView} from 'react-native';
import AppNavigation from './src/navigation/appNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
