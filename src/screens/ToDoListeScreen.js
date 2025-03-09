import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

function ToDoListeScreen() {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoalHandler = () => {
    setGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goal }]);
    setGoal('');
  };

  const removeGoalHandler = goalKey => {
    setGoals(currentGoals => currentGoals.filter(goal => goal.key !== goalKey));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nouvel objectif"
          style={styles.input}
          onChangeText={setGoal}
          value={goal}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>
      <View>
        {goals.map(goal => (
          <View key={goal.key} style={styles.goalItem}>
            <Text>{goal.value}</Text>
            <TouchableOpacity onPress={() => removeGoalHandler(goal.key)}>
              <Text style={styles.deleteButton}>❌</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
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

export default ToDoListeScreen;