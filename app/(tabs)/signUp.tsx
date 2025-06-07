import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthDate] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formatBirthDate = (text: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = text.replace(/\D/g, '');
    
    // Formata a data no padrão DD-MM-AAAA
    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = numbers.slice(0, 2) + '-' + numbers.slice(2);
    }
    if (numbers.length > 4) {
      formatted = formatted.slice(0, 5) + '-' + formatted.slice(5, 9);
    }
    
    return formatted;
  };

const convertDateToISO = (dateStr: string) => {
  const numbers = dateStr.replace(/\D/g, '');

  if (numbers.length === 6) {
    
    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const yearShort = numbers.slice(4, 6);
    const year = `20${yearShort}`;
    return `${year}-${month}-${day}`;
  } else if (numbers.length === 8) {
    
    const day = numbers.slice(0, 2);
    const month = numbers.slice(2, 4);
    const year = numbers.slice(4, 8);
    return `${year}-${month}-${day}`;
  } else {
    
    return dateStr;
  }
};

  const handleCreateAccount = async () => {
    if (!name || !email || !password || !confirmPassword || !birthdate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    setLoading(true);

    const birthdateConverted = convertDateToISO(birthdate);

    try {
      const response = await axios.post('https://backend-production-9ab9.up.railway.app/users' , {
        name,
        email,
        birthdate: birthdateConverted,
        password,
      }); 
      console.log(name);
      console.log(email);
      console.log(birthdate);
      console.log(password);
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        router.push('/(tabs)'); 
      }
    
    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        if (error.response) {
          Alert.alert('Erro', error.response.data?.message || `Erro ${error.response.data.error}`);
        } else if (error.request) {
          Alert.alert('Erro', 'Servidor não respondeu. Tente novamente');
        } else {
          Alert.alert('Erro', 'Erro inesperado. Tente novamente');
        }
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(tabs)')}>
        <Icon name="arrow-left" size={24} color="#52b6cb" />
      </TouchableOpacity>

      <Text style={styles.title}>Crie sua Conta</Text>

      <View style={styles.inputGroup}>
        <Icon name="account" size={20} color="#52b6cb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#a0a0a0"
          value={name}
          onChangeText={setName}
        />
      </View>



      <View style={styles.inputGroup}>
        <Icon name="email" size={20} color="#52b6cb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Seu melhor email"
          placeholderTextColor="#a0a0a0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="calendar" size={20} color="#52b6cb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Data de nascimento"
          placeholderTextColor="#a0a0a0"
          value={birthdate}
          onChangeText={(text) => setBirthDate(formatBirthDate(text))}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="lock" size={20} color="#52b6cb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha"
          placeholderTextColor="#a0a0a0"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon 
            name={showPassword ? 'eye-off' : 'eye'} 
            size={20} 
            color="#52b6cb" 
            style={styles.iconEye} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Icon name="lock" size={20} color="#52b6cb" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#a0a0a0"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon 
            name={showConfirmPassword ? 'eye-off' : 'eye'} 
            size={20} 
            color="#52b6cb" 
            style={styles.iconEye} 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.termsText}>
        Ao continuar, você concorda com nossos{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.seusite.com/termos')}>
          Termos de Serviço
        </Text>{' '}
        e{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.seusite.com/politica')}>
          Política de Privacidade
        </Text>.
      </Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>CRIAR CONTA</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OU</Text>

      <TouchableOpacity style={styles.buttonGoogle} onPress={() => Alert.alert('Google Sign-in')}>
        <Icon name="google" size={20} color="#000" />
        <Text style={styles.googleText}>  CADASTRAR COM GOOGLE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#04212d',
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 25,
    fontWeight: '600',
  },
  inputGroup: {
    flexDirection: 'row',
    backgroundColor: '#0d3046',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 48,
  },
  icon: {
    marginRight: 10,
  },
  iconEye: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
  termsText: {
    color: '#8fa5b9',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    color: '#52b6cb',
    textDecorationLine: 'underline',
  },
  buttonPrimary: {
    backgroundColor: '#52b6cb',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#04212d',
    fontWeight: '600',
    fontSize: 16,
  },
  orText: {
    color: '#8fa5b9',
    fontSize: 14,
    marginBottom: 20,
  },
  buttonGoogle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleText: {
    fontWeight: '600',
    color: '#000',
    fontSize: 15,
  },
});
