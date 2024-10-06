import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {setItem} from '../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('Home');
    setItem('onboarded', '1');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Tamam</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        //bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal: 15}}
        pages={[
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Verimliliği Artır',
            subtitle: 'Verimlilik seviyeni artırmak için bu kanala abone ol',
          },

          {
            backgroundColor: '#fef3c7',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/work.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Kesintisiz Çalış',
            subtitle: 'Kesintisiz bir şekilde işlerini sorunsuzca tamamla',
          },
          {
            backgroundColor: '#a7f3d0',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  style={{flex: 1}}
                  source={require('../assets/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Daha Yüksek Hedeflere Ulaş',
            subtitle:
              'Verimliliğini artırarak daha yüksek hedeflere ulaşmana yardımcı oluyoruz',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width * 0.9,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
});
