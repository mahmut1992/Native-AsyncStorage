import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import LinearGradient from 'react-native-linear-gradient';
import {
  AddCircle,
  BagTick,
  Edit2,
  TickCircle,
  CloseCircle,
} from 'iconsax-react-native';

const TodosScreen = () => {
  // Kullanıcı tarafından girilen todo öğesini saklamak için state
  const [todo, setTodo] = useState('');

  // Todo listesini saklamak için state
  const [todos, setTodos] = useState([]);

  // Todo listesini AsyncStorage'e kaydetme fonksiyonu
  const saveTodos = async saveTodo => {
    try {
      // 'todos' verisini AsyncStorage'e kaydediyoruz
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      // Hata durumunda hata mesajını konsola yazdırıyoruz
      console.log('error', error);
    }
  };

  // Yeni bir todo eklemek için kullanılan fonksiyon
  const addTodo = () => {
    // Eğer kullanıcı bir metin girdiyse todo ekleyelim
    if (todo) {
      // Yeni todo nesnesi oluşturuluyor
      const updateTodos = [
        ...todos, // mevcut todos listesine ekleme yapıyoruz
        {id: uuid.v4(), text: todo, completed: false}, // yeni todo objesi
      ];
      // Todo listesini güncelliyoruz
      setTodos(updateTodos);
      // Yeni todo'yu AsyncStorage'e kaydediyoruz
      saveTodos(updateTodos);
      // Girdi alanını temizliyoruz
      setTodo('');
    }
  };

  // AsyncStorage'den todos listesini yükleme fonksiyonu
  const loadTodos = async () => {
    try {
      // 'todos' verisini AsyncStorage'den alıyoruz
      const storedData = await AsyncStorage.getItem('todos');
      // Eğer veriler varsa, JSON olarak parse edip todos state'ine aktarıyoruz
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      // Hata durumunda konsola yazdırıyoruz
      console.log(error);
    }
  };

  // Bir todo öğesini silme fonksiyonu
  const deleteTodo = async id => {
    // Silinecek todo'yu filtreliyoruz
    const updatedTodos = todos.filter(item => item.id !== id);
    // Todo listemizi güncelliyoruz
    setTodos(updatedTodos);
    // Yeni listeyi AsyncStorage'e kaydediyoruz
    saveTodos(updatedTodos);
  };

  // Bir todo öğesinin tamamlanma durumunu değiştirme fonksiyonu
  const completeTodo = async id => {
    // Todos listesini map'leyerek, id'si eşleşen öğeyi buluyoruz
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    // Todo listesini güncelliyoruz
    setTodos(updatedTodos);
    // Yeni listeyi AsyncStorage'e kaydediyoruz
    saveTodos(updatedTodos);
  };

  // Bir todo öğesini düzenlemek için kullanılan fonksiyon
  const updateTodos = id => {
    // Güncellenmek istenen todo'yu buluyoruz
    const exitingTodo = todos.find(x => x.id === id);
    if (!exitingTodo) return; // Eğer todo bulunamazsa, işlem yapma

    // Kullanıcıdan yeni todo metnini almak için alert prompt açıyoruz
    Alert.prompt(
      'Edit Todo', // Başlık
      'Update', // Açıklama
      newUpdateText => {
        // Eğer yeni bir metin girilmişse
        if (newUpdateText) {
          // Todos listesini güncelliyoruz
          const updatedTodos = todos.map(item =>
            item.id === id ? {...item, text: newUpdateText} : item,
          );
          // Todo listesini güncelliyoruz
          setTodos(updatedTodos);
          // Yeni listeyi AsyncStorage'e kaydediyoruz
          saveTodos(updatedTodos);
        }
      },
      'plain-text', // Alert'in tipi (sadece düz metin)
      exitingTodo.text, // Varsayılan metin olarak mevcut todo'yu ekliyoruz
    );
  };

  // Tüm todo öğelerini silme fonksiyonu
  const clearTodos = async () => {
    setTodos([]); // Todo listesini sıfırlıyoruz
    await AsyncStorage.removeItem('todos'); // AsyncStorage'den tüm todo'ları siliyoruz
  };

  // AsyncStorage'daki tüm verileri temizleme fonksiyonu
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear(); // Tüm AsyncStorage verilerini siliyoruz
      setTodos([]); // Todo state'ini boşaltıyoruz
      Alert.alert('Başarılı', 'Tüm veriler temizlendi'); // Başarılı olduğunda bir uyarı gösteriyoruz
    } catch (error) {
      Alert.alert('Hata', 'Veriler temizlenemedi'); // Hata durumunda uyarı veriyoruz
    }
  };

  // Uygulama ilk açıldığında todos listesini yüklemek için useEffect kullanıyoruz
  useEffect(() => {
    loadTodos(); // Todo listesini yükle
  }, []); // Boş bağımlılık array'i ile sadece ilk renderda çalışacak

  return (
    <LinearGradient colors={['#fef3c7', '#a78bfa']} style={styles.container}>
      {/* SafeAreaView ile ekranın üst kısmındaki güvenli alanı kullanıyoruz */}
      <SafeAreaView>
        {/* Başlık */}
        <Text style={styles.headerText}>TO-DO LIST</Text>

        {/* Todo ekleme inputu */}
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setTodo(text)} // Input değiştiğinde todo state'ini güncelliyoruz
            value={todo} // Todo state'ini inputun değerine bağlıyoruz
            placeholder="Type a Todo" // Input için yer tutucu
            style={styles.input} // Input stilini ayarlıyoruz
          />
          {/* Todo ekleme butonu */}
          <TouchableOpacity
            onPress={addTodo} // Butona basıldığında todo ekle fonksiyonu çalışacak
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>
              {/* + işareti (AddCircle iconu) */}
              <AddCircle size="32" color="#FF8A65" variant="Broken" />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Yeni "Clear All" butonu */}
        <TouchableOpacity
          onPress={clearTodos} // Tüm todo'ları sil
          style={[styles.button, styles.clearButton]}>
          <Text style={styles.buttonText}>Clear All Todos</Text>
        </TouchableOpacity>

        {/* Yeni "Clear All Storage" butonu */}
        <TouchableOpacity
          onPress={clearStorage} // Tüm AsyncStorage verilerini sil
          style={[styles.button, styles.clearStorageButton]}>
          <Text style={styles.buttonText}>Clear All Storage</Text>
        </TouchableOpacity>

        {/* Todo öğelerini listelemek için FlatList */}
        <FlatList
          data={todos} // Todo verilerini FlatList'e bağlıyoruz
          keyExtractor={item => item?.id?.toString()} // Her öğe için benzersiz bir anahtar belirliyoruz
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              {/* Todo metnini ekrana yazdırıyoruz ve tamamlanmışsa farklı stil veriyoruz */}
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText, // Tamamlanmış todo'ya stil ekliyoruz
                ]}>
                {item?.text}
              </Text>

              {/* Todo öğesine ait butonlar */}
              <View style={{flexDirection: 'row'}}>
                {/* Tamamlama butonu */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)} // Todo tamamlandığında tamamla fonksiyonu çalışacak
                    style={[styles.button, styles.completeButton]}>
                    <Text style={styles.buttonText}>
                      {/* Tamamlanmışsa bir X ikonu, tamamlanmamışsa onay işareti */}
                      {item.completed ? (
                        <CloseCircle size="24" color="#000" />
                      ) : (
                        <TickCircle size="27" color="#FF8A65" />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Silme butonu */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)} // Todo silindiğinde silme fonksiyonu çalışacak
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <BagTick size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Düzenleme butonu */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)} // Todo düzenlendiğinde düzenleme fonksiyonu çalışacak
                    style={[styles.button, styles.updateButton]}>
                    <Text style={styles.buttonText}>
                      <Edit2 size="27" color="#FF8A65" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  buttonText: {
    color: 'gray',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  todoText: {
    color: '#000',
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  completeButton: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
  updateButton: {
    padding: 10,
  },
});
