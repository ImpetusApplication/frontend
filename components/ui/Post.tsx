import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('screen');
export default function Post() {
return (
<View style={styles.content}>

    <View style ={styles.header}>
        <View style={styles.userIcon}></View>
            <View style={{flexDirection: 'column', height: height *0.03}}>
                <Text style={styles.userName}>Paulo Gomes{'\n'}</Text>
                <Text style={styles.userActivity}>2h atrás</Text>
            </View>
        <Icon name="dots-vertical" size={25} color="#FFFFFF" style={{position: 'absolute', top: 10, right: 10}} />
    </View>
    <View style={styles.middle}>
        <View style={styles.image}></View>
        <Text style={styles.postDescription}>Treinão de peito hoje daquele modelo partiu Ramon Dino!</Text>

        <View style={{flexDirection: 'row', marginTop: 20}}>
            <Icon name="fire" size={20} color="#2DB3BC"/>
            <Text style={styles.userStreak}>5 dias streak</Text>
        </View>

    </View>
    <View style={styles.bottom}>
        <Icon name="heart-outline" size={25} color="#2DB3BC"/>
        <Text style={{color:'#FFFFFF'}}> 25</Text>
        <View style={{position:'absolute', right:15, flexDirection:'row'}}>
            <Icon name="comment" size={25} color="#FFFFFF"/>
            <Text style={{color:'#FFFFFF'}}> 7</Text>
        </View>

    </View>
    
</View>

)}


const styles = StyleSheet.create({
content: {
    backgroundColor: '#28436B',
    height: height * 0.4,
    width: width * 0.9,
    marginVertical: 15,
    borderRadius: 15,
    shadowColor: '#0000009F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    padding: 10
},

header: {
    height: height * 0.06,
    width: width * 0.85,
    flexDirection: 'row',

},

middle: {
    marginTop: 10,
    height: height * 0.25,
    width: width * 0.85,
    flexDirection: 'column'
},

bottom: {
    
    height: height * 0.04,
    width: width * 0.85,
    flexDirection: 'row',
    marginTop: 20
},

userIcon: {
    height: 50,
    width: 50,
    backgroundColor: '#213655',
    borderRadius: 100,
    marginRight: 10
},

userName: {
    fontSize: 20,
    color: '#FFFFFF',
    margin: 0
},

userActivity:{
    color: '#A9A9A9',
    margin: 0
},

image: {
    height: height * 0.17,
    width: width * 0.8,
    backgroundColor: '#DFDF00',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
    margin: 'auto',
    marginBottom: 5,
},

userStreak: {
    fontSize: 12,
    color: '#2DB3BC'
},

postDescription:{
    margin: 0,
    color: '#FFFFFF'
},

text: {
    color: '#FFFFFF',
    margin: 0
}
});