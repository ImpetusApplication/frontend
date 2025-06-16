import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const HeartButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
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
