import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';

const initialTasks = [
  { id: '1', text: 'Aprender React Native', completed: false },
  { id: '2', text: 'Construir la To-Do App', completed: true },
  { id: '3', text: 'Hacer ejercicio', completed: false },
  { id: '4', text: 'Comprar víveres', completed: false },
];

export default function TodoListScreen() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleTaskCompleted = (id) => {
        console.log('Toggle task:', id);
        // aqui ira la logica para cambiar estado de completed de una tarea
    }

    const deleteTask = (id) => {
        console.log('Delete task:', id);
    }

    const renderItem = ({item}) => (
        <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
                {item.text}
            </Text>
            {/* botones o iconos para acciones */}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.header}>Mi Lista de Tareas</Text>

                <FlatList
                    data={tasks} // los datos que se van a a renderizar
                    renderItem={renderItem} // la funcion que renderiza cada item
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                 />               
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E8EAED', // Un color de fondo suave para toda la pantalla
  },
  container: {
    flex: 1,
    paddingTop: 50, // Espacio superior para el encabezado
    paddingHorizontal: 20, // Padding a los lados
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20, // Espacio al final de la lista
  },
  taskItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000', // Sombra para dar un efecto de profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  taskText: {
    fontSize: 18,
    maxWidth: '80%', // Para que el texto no ocupe todo el ancho y deje espacio para botones
  },
  completedTaskText: {
    textDecorationLine: 'line-through', // Tachado para tareas completadas
    color: '#888', // Un color más tenue para tareas completadas
  },
});