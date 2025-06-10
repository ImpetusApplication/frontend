import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const HeartButton = () => {
  // Estado para controlar se o coração está preenchido ou não
  const [isFavorite, setIsFavorite] = useState(false);

  // Função para alternar o estado do ícone
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Icon 
        name={isFavorite ? "heart" : "heart-outline"} 
        size={25} 
        color="#2DB3BC" 
      />
    </TouchableOpacity>
  );
};

export default HeartButton;
