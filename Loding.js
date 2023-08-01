// this  component display default Loding
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loding = () => (
  <LinearGradient style={[styles.container, styles.horizontal]} colors={['#4c669f', '#3b5998', '#192f6a']}>
    <ActivityIndicator size="90%" color="#fff" />
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    
  },
  horizontal: {
    justifyContent: "space-evenly",
    fontSize:7,
    padding: 120
  }
});
export default Loding;
