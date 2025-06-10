import Post from '@/components/ui/Post';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('screen');

type RootDrawerParamList = {
  Home: undefined;
};

type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
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
      <StatusBar barStyle="light-content" backgroundColor="#27436B" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftGroup} onPress={() => navigation.openDrawer()}>
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
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Post/>
        <Post/>
        <Post/>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Icon name="home" size={35} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="coffee" size={35} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{backgroundColor: '#2DB3BC', borderRadius: 300}}>
            <Icon name="plus" size={35} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
         <Icon name="calendar-clock" size={35} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="account" size={35} color="#FFFFFF" />
        </TouchableOpacity>

        
        
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'space-between'
},
header: {
  backgroundColor: '#27436b',
  height: height * 0.08,
  elevation: 5,
  flexDirection: 'row',
  alignItems: 'center',
},
contentContainer: {
  backgroundColor: '#1f3652',
  height: height * 0.84,
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
footer: {
  backgroundColor: '#27436b',
  height: height * 0.06, // Tamanho fixo para o footer
  width: width,
  elevation: 5,
  flexDirection: 'row',
  justifyContent: 'space-around', // Distribui os ícones de forma espaçada
  alignItems: 'center', // Alinha os ícones verticalmente no centro
},

});
