import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('screen');

interface HeaderProps {
  setDrawerVisible?: (visible: boolean) => void;
}

export function Header({ setDrawerVisible }: HeaderProps) {
    const handleMenuPress = () => {
      if (setDrawerVisible) {
        setDrawerVisible(true);
      } else {
        console.warn('setDrawerVisible function not provided to Header');
      }
    };

    return(
        <View style={styles.header}>
        <TouchableOpacity style={styles.leftGroup} onPress={handleMenuPress}>
          <Icon name="menu" size={30} color="#FFFFFF" />
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
    )
}

const styles = StyleSheet.create({
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