import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function GoalItem({ goal, onDelete, onEdit }) {
  return (
    <View style={styles.goalItem}>
      <Text>{goal.value}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => onEdit(goal)}>
          <Text style={styles.editButton}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(goal.key)}>
          <Text style={styles.deleteButton}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});

export default GoalItem;