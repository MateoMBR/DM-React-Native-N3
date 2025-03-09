import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';

function GoalItem({ goal, onDelete, onEdit }) {
  return (
    <List.Item
      title={goal.value}
      right={() => (
        <View style={styles.buttons}>
          <IconButton icon="pencil" color="blue" onPress={() => onEdit(goal)} />
          <IconButton icon="delete" color="red" onPress={() => onDelete(goal.key)} />
        </View>
      )}
      style={styles.goalItem}
    />
  );
}

const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
  },
});

export default GoalItem;