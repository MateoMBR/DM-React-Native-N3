import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

function GoalInput({ visible, onAddGoal, onCancel, goalToEdit, onEditGoal }) {
  const [enteredGoal, setEnteredGoal] = useState('');

  useEffect(() => {
    if (goalToEdit) {
      setEnteredGoal(goalToEdit.value);
    }
  }, [goalToEdit]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    if (goalToEdit) {
      onEditGoal(goalToEdit.key, enteredGoal);
    } else {
      onAddGoal(enteredGoal);
    }
    setEnteredGoal('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nouvel objectif"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <Button title={goalToEdit ? "Edit" : "Add"} onPress={addGoalHandler} />
        <Button title="Cancel" color="red" onPress={onCancel} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default GoalInput;