import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import TaskItem from "./components/TaskItem";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const inputTextHandler = (e) => {
    setTask(e);
  };
  const addTaskToList = () => {
    if (task) {
      setTaskList((taskList) => [...taskList, task]);
      setTask("");
    } else
      Alert.alert("Error", "Your task cannot be empty!", [
        { text: "OK", onPress: () => console.log("OK pressed") },
      ]);
  };
  const deleteItemFromList = (textContent) => {
    const newTaskList = taskList.filter((task) => task != textContent);
    setTaskList(newTaskList);
  };
  return (
    <View style={styles.body}>
      <View style={styles.scrollViewContainer}>
        <StatusBar backgroundColor="#8C7AA9" />
        <ScrollView contentContainerStyle={styles.toDoListContainer}>
          <Text style={styles.toDoListTitle}>Today tasks</Text>
          {taskList.length ? (
            taskList.map((taskItem, index) => (
              <TaskItem
                key={index}
                taskItemText={taskItem}
                deleteItem={deleteItemFromList}
                style={styles.taskItem}
              />
            ))
          ) : (
            <></>
          )}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.taskInputContainer}
      >
        <TextInput
          style={styles.textInputStyle}
          onChangeText={inputTextHandler}
          value={task}
          placeholder="Task content.."
        />
        <TouchableOpacity onPressOut={addTaskToList}>
          <View style={styles.addTaskButton}>
            <Text style={styles.addTaskButtonIcon}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "#FFE39C",
  },
  scrollViewContainer: {
    height: "90%",
  },
  toDoListContainer: {
    marginTop: "20%",
    alignItems: "center",
  },
  toDoListTitle: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: "10%",
    borderBottomWidth: 1,
    borderColor: "#8C7AA9",
  },
  taskInputContainer: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: "5%",
    backgroundColor: "#8C7AA9",
  },
  textInputStyle: {
    backgroundColor: "#F2EDEB",
    width: "80%",
    borderRadius: 20,
    paddingLeft: 10,
    height: 43,
    fontSize: 15,
    opacity: 0.8,
    marginTop: "2%",
  },

  addTaskButton: {
    backgroundColor: "#F2EDEB",
    height: 45,
    width: 45,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  addTaskButtonIcon: {
    fontSize: 25,
    opacity: 0.8,
  },
});

