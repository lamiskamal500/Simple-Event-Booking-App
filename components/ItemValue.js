import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemValue = ({ item, value }) => {
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <Text style={styles.item}>{item}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default ItemValue;

const styles = StyleSheet.create({
  item: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
});
