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
      const updateTodos = [
        ...todos,
        {id: uuid.v4(), text: todo, completed: false},
      ];
      setTodos(updateTodos);
      saveTodos(updateTodos);
      setTodo(''); // Input'u temizliyoruz
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async id => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completeTodo = async id => {
    const updatedTodos = todos.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodos = id => {
    const exitingTodo = todos.find(x => x.id === id);
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo',
      'Update',
      newUpdateText => {
        if (newUpdateText) {
          const updatedTodos = todos.map(item =>
            item.id === id ? {...item, text: newUpdateText} : item,
          );
          setTodos(updatedTodos);
          saveTodos(updatedTodos);
        }
      },
      'plain-text',
      exitingTodo.text,
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
          keyExtractor={item => item?.id?.toString()}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}>
                {item?.text}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => completeTodo(item?.id)}
                    style={[styles.button, styles.completeButton]}>
                    <Text style={styles.buttonText}>
                      {item.completed ? (
                        <CloseCircle size="24" color="#000" />
                      ) : (
                        <TickCircle size="27" color="#FF8A65" />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => deleteTodo(item?.id)}
                    style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                      <BagTick size="27" color="#FF8A65" variant="Broken" />
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => updateTodos(item?.id)}
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
