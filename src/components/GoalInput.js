import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TextInput, Button, Portal, Dialog } from 'react-native-paper';

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
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{goalToEdit ? "Edit Goal" : "Add Goal"}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Nouvel objectif"
            mode="outlined"
            style={styles.input}
            onChangeText={goalInputHandler}
            value={enteredGoal}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel} color="red">Cancel</Button>
          <Button onPress={addGoalHandler}>{goalToEdit ? "Edit" : "Add"}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
});

export default GoalInput;