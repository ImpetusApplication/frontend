import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeScreen from '../../app/(tabs)/telaInicial';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Grupos</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>
          <Icon name="account-group" size={24} color="#FFFFFF" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Só os marombas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>
          <Icon name="account-group" size={24} color="#FFFFFF" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Só os marombas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>
          <Icon name="account-group" size={24} color="#FFFFFF" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Só os marombas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => props.navigation.navigate('Home')}>
          <Icon name="account-group" size={24} color="#FFFFFF" style={styles.drawerIcon} />
          <Text style={styles.drawerItemText}>Só os marombas</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1f3652',
          width: '75%',
        },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1f3652',
  },
  header: {
    backgroundColor: '#27436b',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItem: {
    paddingVertical: 15,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a4d6d',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  drawerIcon: {
    marginRight: 10,
  },
});
