import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { Header } from '../../components/ui/Header';
import NavBar from '../../components/ui/navBar';
import Post from '../../components/ui/Post';

const { width, height } = Dimensions.get('screen');

interface HomeScreenProps {
  setDrawerVisible?: (visible: boolean) => void;
}

export default function HomeScreen({ setDrawerVisible }: HomeScreenProps) {
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
      <Header setDrawerVisible={setDrawerVisible}/>
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
