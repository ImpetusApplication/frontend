import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function NavBar(){
    return(      
    <View style={styles.footer}>
        <TouchableOpacity onPress={() => {router.push('/(tabs)/telaInicial')}}>
            <Icon name="home" size={35} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {router.push('/(tabs)/FoodScreen')}}>
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
        <TouchableOpacity onPress={() => {router.push('/(tabs)/ProfileScreen')}}>
            <Icon name="account" size={35} color="#FFFFFF" />
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#27436b',
        height: height * 0.06,
        width: width,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 1
    },
})
