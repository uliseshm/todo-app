// src/components/TodoInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'; // Importamos Keyboard

export default function TodoInput({ onAddTask }) {
  const [taskText, setTaskText] = useState(''); // Estado para guardar el texto del input

  const handleAddTask = () => {
    if (taskText.trim()) { // Solo añade si el texto no está vacío o solo con espacios
      onAddTask(taskText.trim()); // Llama a la función que viene de props para añadir la tarea
      setTaskText(''); // Limpia el input después de añadir
      Keyboard.dismiss(); // Cierra el teclado después de añadir la tarea
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Añadir nueva tarea..." // Texto que se muestra cuando el input está vacío
        placeholderTextColor="#999"
        value={taskText} // El valor del input está controlado por nuestro estado
        onChangeText={setTaskText} // Actualiza el estado cada vez que el texto cambia
        onSubmitEditing={handleAddTask} // Permite añadir la tarea presionando "Enter" en el teclado
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row', // Los elementos se alinean horizontalmente
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Espacio debajo del componente
    paddingHorizontal: 5, // Pequeño padding horizontal
  },
  input: {
    flex: 1, // Ocupa todo el espacio disponible menos el del botón
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    borderColor: '#CCC',
    borderWidth: 1,
    marginRight: 10, // Espacio entre el input y el botón
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Para hacerlo circular
    backgroundColor: '#007BFF', // Color azul para el botón
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Sombra para Android
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
});