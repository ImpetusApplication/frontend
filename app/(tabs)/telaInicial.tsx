import { Header } from '@/components/ui/Header';
import NavBar from '@/components/ui/navBar';
import Post from '@/components/ui/Post';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from "react-native";

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
      <Header/>
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Post/>
        <Post/>
        <Post/>
      </ScrollView>
      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'space-between'
},
contentContainer: {
  backgroundColor: '#1f3652',
},
});
