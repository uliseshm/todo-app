import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';

// const initialTasks = [
//   { id: '1', text: 'Aprender React Native', completed: false },
//   { id: '2', text: 'Construir la To-Do App', completed: true },
//   { id: '3', text: 'Hacer ejercicio', completed: false },
//   { id: '4', text: 'Comprar víveres', completed: false },
// ];

const STORAGE_KEY = '@my_todo_app:tasks';

export default function TodoListScreen() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const loadTask = async () => {
        try {
          const storedTask = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedTask !== null) {
            setTasks(JSON.parse(storedTask));
          }
        } catch (error) {
          console.error('Error al cargar tareas:', error);
          Alert.alert('Error', 'No se pudieron cargar las tareas. Intenta de nuevo.');
        }
      };

      loadTask();
    }, []);

    useEffect(() => {
      const saveTasks = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
          console.error('Error al guardar tarea:', error);
          Alert.alert('Error', 'No se pudieron guardar las tareas, intentna de nuevo.')
        }
      };

      saveTasks();
    }, [tasks]);

    const addTask = (text) => {
      const newId = String(Date.now());
      const newTask = {id: newId, text, completed: false};
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    const toggleTaskCompleted = (id) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    const renderItem = ({item}) => (
        <TodoItem
          item={item}
          onToggleCompleted={toggleTaskCompleted}
          onDeletedTask={deleteTask}
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
              style={styles.keyboardAvoidingView}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
            <View style={styles.container}>
                <Text style={styles.header}>Mi Lista de Tareas</Text>

                {tasks.length === 0 ? (
                <Text style={styles.noTasksText}>¡No tienes tareas pendientes! 🎉</Text>
                ) : (
                <FlatList
                    data={tasks} // los datos que se van a a renderizar
                    renderItem={renderItem} // la funcion que renderiza cada item
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                 />
                 )}               
            </View>

            <TodoInput onAddTask={addTask} />
          </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  keyboardAvoidingView: {
    flex: 1, // Asegura que ocupe todo el espacio disponible para el KeyboardAvoidingView
  },
  container: {
    flex: 1, // Permite que el contenedor de la lista crezca y ocupe el espacio
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    maxWidth: '80%',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  noTasksText: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});