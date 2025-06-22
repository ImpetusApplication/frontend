import NotificationCard from '@/components/ui/NotificationCard';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('screen');

export default function NotificationScreen() {
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftGroup} onPress={()=> router.push('/(tabs)/telaInicial')}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.rightGroup}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/notificationScreen')}>
            <Icon name="bell-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/streakScreen')}>
            <Icon name="fire" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      
      <NotificationCard iconType={1} questionText='Bebeu quantos copos de água hoje?'/>
      <NotificationCard iconType={0} questionText='Quantas horas você leu hoje?'/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0D223F",
    gap: 20
  },
  header: {
    backgroundColor: '#27436b',
    height: height * 0.08,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
},
  leftGroup: {
    position: 'absolute',
    left: 10,
  },
  rightGroup: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    columnGap: 20
  },
});