import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleAddTask(newTaskTitle: string) {
    const newTaskItem = {
      id: Math.random(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldstate => [...oldstate, newTaskItem]);
    setNewTaskTitle('');
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({... task}));

    const foundItem = updateTasks.find(item => item.id === id);
    if(!foundItem) return

    foundItem.done = !foundItem.done;
    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    const filterId = tasks.filter(tasks => tasks.id !== id);
    setTasks(filterId);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})