import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function GoalItem({ goal, onDelete }) {
  return (
    <TouchableOpacity onPress={() => onDelete(goal.key)}>
      <View style={styles.goalItem}>
        <Text>{goal.value}</Text>
        <Text style={styles.deleteButton}>❌</Text>
      </View>
    </TouchableOpacity>
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
  deleteButton: {
    color: 'red',
  },
});

export default GoalItem;