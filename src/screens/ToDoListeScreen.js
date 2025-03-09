import React, { useState } from 'react';
import { View, Button, StyleSheet, FlatList, ImageBackground } from 'react-native';
import GoalItem from '../components/GoalItem';
import GoalInput from '../components/GoalInput';

function ToDoListeScreen() {
  const [goals, setGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  const addGoalHandler = (goalTitle) => {
    setGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goalTitle }]);
    setIsAddMode(false);
  };

  const editGoalHandler = (goalKey, goalTitle) => {
    setGoals(currentGoals => currentGoals.map(goal => 
      goal.key === goalKey ? { ...goal, value: goalTitle } : goal
    ));
    setIsAddMode(false);
    setGoalToEdit(null);
  };

  const removeGoalHandler = goalKey => {
    setGoals(currentGoals => currentGoals.filter(goal => goal.key !== goalKey));
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
    setGoalToEdit(null);
  };

  const startEditGoalHandler = (goal) => {
    setGoalToEdit(goal);
    setIsAddMode(true);
  };

  return (
    <ImageBackground source={require('../assets/background.avif')} style={styles.background}>
      <View style={styles.screen}>
        <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
        <GoalInput
          visible={isAddMode}
          onAddGoal={addGoalHandler}
          onCancel={cancelGoalAdditionHandler}
          goalToEdit={goalToEdit}
          onEditGoal={editGoalHandler}
        />
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <GoalItem
              goal={item}
              onDelete={removeGoalHandler}
              onEdit={() => startEditGoalHandler(item)}
            />
          )}
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
});

export default ToDoListeScreen;