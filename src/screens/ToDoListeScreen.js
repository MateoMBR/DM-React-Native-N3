import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, ImageBackground } from 'react-native';
import GoalItem from '../components/GoalItem';

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
    <ImageBackground source={require('../assets/background.avif')} style={styles.background}>
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
        <FlatList
          data={goals}
          renderItem={({ item }) => <GoalItem goal={item} onDelete={removeGoalHandler} />}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
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