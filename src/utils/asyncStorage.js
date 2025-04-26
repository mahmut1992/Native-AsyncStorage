import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('setItem', error);
  }
};

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(`🔍 AsyncStorage'dan gelen veri: ${key} = ${value}`); // DEBUG
  } catch (error) {
    console.log('getItem', error);
  }
};

export const removeItem = async key => {
  try {
    const value = await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('removeItem', error);
  }
};
