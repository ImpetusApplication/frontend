import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function FoodCard() {
  const [expanded, setExpanded] = useState(false); // Estado para controlar a expansão
  const [heightAnim] = useState(new Animated.Value(0)); // Valor da animação de altura do conteúdo extra

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 100, 
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon name="food" size={30} color="#FFFFFF" />
        <Text style={styles.text}>12:00 - Lanche da Tarde</Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Icon name="chevron-down" size={35} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.expandedContent,
          { height: heightAnim }, 
        ]}
      >
        {expanded && (
          <Text style={styles.expandedText}>Conteúdo expandido aqui!</Text>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#28436B',
    width: width * 0.9,
    padding: 25,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  expandedContent: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    width: width * 0.85,
    overflow: 'hidden',
  },
  expandedText: {
    color: '#000000',
    fontSize: 16,
  },
});
