import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {removeItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem('onboarded');
    navigation.push('Onboarding');
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
        onPress={() => navigation.navigate('Todo')}
        style={styles.addtaskButton}>
        <LinearGradient
          colors={['#a78bfa', '#fef3c7']} // Güncellenmiş renkler
          style={styles.addtaskButton}>
          <Text style={styles.addtaskText}>New Task, Who’s In?</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <LinearGradient
          colors={['#a7f3d0', '#ff6347']} // Güncellenmiş renkler
          style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
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
    backgroundColor: '#fef3c7', // Sayfanın arka plan rengi
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },

  addtaskButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },

  addtaskText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  resetButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },

  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
