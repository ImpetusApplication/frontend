import FoodCard from '@/components/ui/FoodCard';
import { Header } from '@/components/ui/Header';
import NavBar from '@/components/ui/navBar';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MyScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://seu-backend.com/api/dados');
        const resultado = response.data;

        
        setData(Array.isArray(resultado) ? resultado : []);
      } catch (err) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <FoodCard/>
        </ScrollView>
        <NavBar/>
      </View>
    );
  }

  if (data.length === 0) {
    // 👉 Tela caso o backend esteja vazio
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <View style={{flexDirection: 'column', alignItems: 'center', gap: 10}}>
                <Image source={require('@/assets/images/foodIcon.png')}/>
                <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20, }}>Adicione sua dieta</Text>
                <View style={{backgroundColor: '#2DB3BC', borderRadius: 300}}>
                    <Icon name="plus" size={60} color="#FFFFFF" />
                </View>
            </View>
        </ScrollView>
        <NavBar/>
      </View>
    );
  }

  // 👉 Tela caso o backend retorne dados
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>{JSON.stringify(item)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213655',
  },
  list: {
    padding: 20,
  },
  card: {
    padding: 16,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
  },
  contentContainer: {

  }
});
