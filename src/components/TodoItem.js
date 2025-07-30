import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TodoItem({item, onToggleCompleted, onDeletedTask}) {
    return (
        <View style={styles.taskItem}>
            <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => onToggleCompleted(item.id)}
            >
                <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
                    {item.completed && <Text style={styles.checkmark}>✓</Text>}
                </View>
            </TouchableOpacity>

            {/* Texto de la tarea */}
            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
                {item.text}
            </Text>
            {/* Touchable para eliminar */}
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDeletedTask(item.id)}
            >
                <Text style={styles.deleteButtonText}>✕</Text>
                <MaterialIcons name="delete" size={24} color="#FF6347" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
  checkboxContainer: {
    paddingRight: 15, // Espacio a la derecha del checkbox
    paddingVertical: 5, // Aumenta el área táctil vertical
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12, // Para hacerlo circular
    borderWidth: 2,
    borderColor: '#007BFF', // Color del borde del checkbox
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxCompleted: {
    backgroundColor: '#007BFF', // Fondo cuando está completado
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 18,
    flex: 1, // Permite que el texto ocupe el espacio disponible
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    paddingLeft: 15, // Espacio a la izquierda del botón de eliminar
    paddingVertical: 5, // Aumenta el área táctil vertical
  },
  deleteButtonText: {
    fontSize: 22,
    color: '#FF6347', // Color rojo para eliminar
    fontWeight: 'bold',
  },
});