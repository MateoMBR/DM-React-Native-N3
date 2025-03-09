import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function ToDoListeScreen() {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const addGoalHandler = () => {
    setGoals(currentGoals => [...currentGoals, goal]);
    setGoal('');
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
        {goals.map((goal, index) => (
          <Text key={index}>{goal}</Text>
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
});

export default ToDoListeScreen;