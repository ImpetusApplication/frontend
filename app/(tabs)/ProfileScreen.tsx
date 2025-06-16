import Calendar from "@/components/ui/Calendar";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('screen');

export default function ProfileScreen() {
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
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5}} onPress={() => {router.push('/(tabs)/telaInicial')}}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF' }}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.account}>
        <View style={styles.profilePicture}></View>
        <Text style={{ color: '#FFFFFF', marginBottom: 10 }}>Nome do usuário</Text>

        <View style={styles.statsRow}>
          <View style={styles.statsColumn}>
            <Text style={styles.statsNumber}>X</Text>
            <Text style={styles.statsLabel}>Postagens</Text>
          </View>
          <View style={styles.statsColumn}>
            <Text style={styles.statsNumber}>Y</Text>
            <Text style={styles.statsLabel}>Dias ativos</Text>
          </View>
          <View style={styles.statsColumn}>
            <Text style={styles.statsNumber}>Z</Text>
            <Text style={styles.statsLabel}>Leitura</Text>
          </View>
        </View>
      </View>

      <Calendar />

      <TouchableOpacity style={{ alignSelf: 'center' }}>
        <View style={styles.button}>
          <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Ver todos os dias</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#213655",
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#213655',
    height: height * 0.06,
    width: width,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.05,
    paddingHorizontal: 10
  },
  account: {
    height: height * 0.3,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10
  },
  profilePicture: {
    backgroundColor: '#304c78',
    height: 150,
    width: 150,
    borderRadius: 500,
    elevation: 5
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    alignSelf: 'center',
  },
  statsColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statsNumber: {
    color: '#2DB3BC',
    textAlign: 'center',
  },
  statsLabel: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    height: height * 0.05,
    width: width * 0.5,
    backgroundColor: '#28436B',
    elevation: 5,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10
  },
});
