import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

// Tipagem da prop iconType
interface NotificationCardProps {
  iconType: 0 | 1; // 0 para um ícone, 1 para outro ícone
  questionText: string; // Texto da pergunta
}

export default function NotificationCard({
  iconType,
  questionText
}: NotificationCardProps) {
  // Lógica para escolher o ícone com base no valor de iconType
  const iconName = iconType === 1 ? 'water-outline' : 'notebook'; // Exemplo: 1 = 'water-outline', 0 = 'alert'

  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center' }}>
        <Icon name={iconName} size={70} color={'#FFFFFF'} />
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>
          {questionText}
        </Text>
        <TextInput style={styles.input}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#28436B',
    height: height * 0.1,
    width: width * 0.9,
    borderRadius: 20,
    elevation: 10
  },

  input: {
    borderRadius: 10,
    height: 35,
    width: width * 0.6,
    backgroundColor: '#FFFFFF'
  },
});
