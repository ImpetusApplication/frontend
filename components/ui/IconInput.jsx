import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

export default function IconInput({ iconName, placeholder, secureTextEntry, color, keyboardType, onChangeText, value}) {
    return (
        <View style={styles.container} >
            {iconName && <Icon name={iconName} size={20} color={color} style={styles.icon} />}
            <TextInput keyboardType={keyboardType} onChangeText={onChangeText} value={value} style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} placeholderTextColor={color}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#A9A9A9'
  },
});