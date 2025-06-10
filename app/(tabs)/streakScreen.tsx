import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StreakScreen() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);
    }
    loadToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>STREAK SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D223F",
  },
});