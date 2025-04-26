import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AddCircle,
  BagCross,
  CloseCircle,
  Edit2,
  TickCircle,
} from 'iconsax-react-native';
import {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';

const TodosScreen = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const saveTodos = async saveTodo => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log('error', error);
    }
  };
  const addTodo = () => {
    if (todo) {
      const updateTodos = [...todos, {id: uuid.v4(), text: todo}];
      setTodos(updateTodos);
      saveTodos(updateTodos);
      setTodo('');
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const completeTodo = id => {
    const updatedTodos = todos.map(item =>
      item.id == id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = id => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodos = id => {
    const foundedTodos = todos.find(item => item.id == id);
    if (!foundedTodos) return;

    Alert.prompt(
      'Edit Todo',
      'Update',
      newUpdateText => {
        if (newUpdateText) {
          const updatedTodos = todos.map(item =>
            item.id == id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updatedTodos);
          saveTodos(updatedTodos);
        }
      },
      'plain-text',
      foundedTodos.text,
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <LinearGradient colors={['#fef3c7', '#a78bfa']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>TO-DO LIST</Text>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={text => setTodo(text)}
            value={todo}
            placeholder="Type a Todo"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>
              <AddCircle size="32" color="#FF8A65" variant="Broken" />
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}>
                {item.text.length > 25
                  ? item.text.slice(0, 20) + '...'
                  : item.text}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.completeButton]}
                    onPress={() => completeTodo(item?.id)}>
                    <Text>
                      {/* Tamamlanmışsa X iconu tamamlanmamışsa onay iconu */}
                      {item.completed ? (
                        <CloseCircle
                          size="27"
                          color="#FF8A65"
                          variant="Broken"
                        />
                      ) : (
                        <TickCircle
                          size="27"
                          color="#FF8A65"
                          variant="Broken"
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* silme butonu */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => deleteTodo(item.id)}>
                    <Text>
                      <BagCross size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Düzenleme butonu */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
                    style={[styles.button, styles.updateButton]}>
                    <Text>
                      <Edit2 size="27" color="#FF8A65" variant="Broken" />
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
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    padding: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'gray',
    flex: 1,
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  todoText: {
    padding: 5,
    color: '#000',
    textDecorationLine: 'none',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginRight: 10,
  },

  deleteButton: {},
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
