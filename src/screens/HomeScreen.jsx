import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../utils/router';
import {removeItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');
const {HOME, ONBOARDING, TODOS} = SCREENS;

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.replace(ONBOARDING);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <Lottie
          style={{flex: 1}}
          source={require('../assets/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(TODOS)}
        style={styles.addTaskButton}>
        <LinearGradient
          style={styles.addTaskButton}
          colors={['#a78bfa', '#fef3c7']}>
          <Text style={{color: 'black'}}>New Task, Who's In?</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <LinearGradient
          style={styles.resetButton}
          colors={['#a7f3d0', '#ff6347']}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Reset
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fef3c7',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  addTaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3.85,
    elevation: 5,
  },
  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3.85,
    elevation: 5,
  },
});
