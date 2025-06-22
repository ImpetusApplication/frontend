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
      <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Header setDrawerVisible={setDrawerVisible}/>
        <Post 
          userName="Paulo Gomes" 
          userActivity="2h atrás" 
          postDescription="Treinão de peito hoje daquele modelo partiu Ramon Dino!" 
          streak="5 dias streak" 
          likes={25} 
          comments={7} 
          userIconImage="https://api/imagem-do-usuario.jpg" 
          postImage="https://api/imagem-do-post.jpg" 
        />
          <Post 
            userName="Manel do Mel" 
            userActivity="1h atrás" 
            postDescription="Treininho de perna, tem que respeitar." 
            streak="7 dias streak" 
            likes={999} 
            comments={69}
            userIconImage="https://api.com/imagem-do-usuario.jpg" 
            postImage="https://api.com/imagem-do-post.jpg" 
          />
        <Post 
          userName="Lucas Fulano" 
          userActivity="Online" 
          postDescription="Cardiozão brabo" 
          streak="5 dias streak" 
          likes={12} 
          comments={3} 
          userIconImage="https://api.com/imagem-do-usuario.jpg" 
          postImage="https://api.com/imagem-do-post.jpg" 
        />
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
