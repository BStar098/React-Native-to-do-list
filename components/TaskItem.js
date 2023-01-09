import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

function TaskItem({ taskItemText, deleteItem }) {
  return (
    <View style={styles.taskItemContainer}>
      <Text style={styles.taskItemTextStyle}>{taskItemText}</Text>
      <TouchableOpacity
        onPress={() => {
          deleteItem(taskItemText);
        }}
      >
        <FontAwesome5 style={styles.deleteIcon} name="trash" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8C7AA9",
    width: "90%",
    borderRadius: 25,
    marginBottom: 15,
    padding: 14,
    shadowColor: "rgb(1,0,0)",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 10,
  },
  taskItemTextStyle: {
    width: "90%",
    color: "#F2EDEB",
    fontSize: 18,
  },
  deleteIcon: {
    color: "#FF6D79",
    opacity: 0.8,
  },
});

export default TaskItem;
