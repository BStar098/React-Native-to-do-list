import React, { useState } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const inputTextHandler = (e) => {
    setTask(e);
  };
  const addTaskToList = () => {
    if (task) {
      setTaskList((taskList) => [
        ...taskList,
        { text: task, key: (Math.random() * Math.random()).toString() },
      ]);
      setTask("");
    } else
      Alert.alert("Error", "Your task cannot be empty!", [
        { text: "OK", onPress: () => console.log("OK pressed") },
      ]);
  };
  const deleteItemFromList = (textContent) => {
    const newTaskList = taskList.filter((task) => task.text != textContent);
    setTaskList(newTaskList);
  };
  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="#8C7AA9" />
      <View style={styles.scrollViewContainer}>
        <Text style={styles.toDoListTitle}>Today tasks</Text>
        <FlatList
          contentContainerStyle={styles.tasksContainer}
          data={taskList}
          renderItem={(itemData) => {
            return (
              <TaskItem
                taskItemText={itemData.item.text}
                deleteItem={deleteItemFromList}
                style={styles.taskItem}
              />
            );
          }}
        />
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
    flex: 1,
    backgroundColor: "#FFE39C",
  },
  scrollViewContainer: {
    height: "90%",
    justifyContent: "center",
  },
  tasksContainer: { alignItems: "center" },
  toDoListTitle: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "500",
    marginTop: "15%",
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
