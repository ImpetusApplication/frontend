import Post from '@/components/ui/Post';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
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
      <StatusBar barStyle="light-content" backgroundColor="#27436b" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftGroup} onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.rightGroup}>
        <Icon name="bell-outline" size={30} color="#FFFFFF" />
        <Icon name="fire" size={30} color="#FFFFFF" />
        </View>
      </View>
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Post/>
        <Post/>
        <Post/>
      </ScrollView>
      <View style={styles.footer}>
        <Icon name="home" size={50} color="#FFFFFF" />
        <Icon name="coffee" size={50} color="#FFFFFF" />

        <View style={{backgroundColor: '#2DB3BC', borderRadius: 300}}>
          <Icon name="plus" size={50} color="#FFFFFF" />
        </View>

        <Icon name="calendar-clock" size={50} color="#FFFFFF" />
        <Icon name="account" size={50} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  
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
  height: height * 0.05,
  width: width,
  elevation: 5,
  flexDirection: 'row',
  gap: width * 0.08
},

});
