import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';



export default function HomeScreen() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Por favor, preencha email e senha');
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('https://backend-production-9ab9.up.railway.app/users/login', {
      email,
      password,
    });

    if (response.status === 200) {
      Alert.alert('Login efetuado com sucesso!');
      console.log('login com sucesso')
      router.push('/(tabs)/signUp');
      
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Exibe mensagem amigável ao usuário, se disponível
        Alert.alert('Erro', error.response.data?.message || 'Erro no servidor');
        console.log('Erro de resposta do servidor', error.response.data);
      } else if (error.request) {
        Alert.alert('Erro', 'Servidor não respondeu. Tente novamente');
      } else {
        Alert.alert('Erro', 'Erro ao tentar fazer login.');
      }
    } else {
      Alert.alert('Erro', 'Erro inesperado.');
    }
  } finally {
    setLoading(false);
  }
};

  
  
  
  return (
   <View>

   </View>


  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#0D223F'

  },

  contentContainer: {

 

  },

  logoContainer: {


  },

  logo: {

    height: 150,
    width: 150,
    margin: 'auto',

  },

  loginTitle: {

    color: '#ffffff',
    margin: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30


  },

  forgotPassword: {

    textAlign: 'right',
    display: 'flex',
    margin: 'auto',
    color: '#FFFFFF',
    marginBottom: 10
    
  },

  loginButton: {

    backgroundColor: '#48D1CC',
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,

  },

  loginButtonText: {
    margin: 'auto',
    fontSize: 16,
    fontWeight: 'bold'

  },

  containerSeparator: {

    padding: 20,

  },

  separator: {

    flexDirection: 'row', 
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,

  },

  textLine: {

    color: '#a9a9a9',
    fontSize: 16,
    marginHorizontal: 10,
    backgroundColor: '#0D223F',

  },

  line: {

    flex: 1, 
    height: 1, 
    backgroundColor: '#A9A9A9', 

  },

  googleBtn: {

    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: 'visible',

  },

  content: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, 

  },
  text: {

    color: '#0D223F',
    fontWeight: 'bold',
    fontSize: 16,

  },

signupContainer: {
  position: 'absolute',       // Faz o container ficar posicionado relativo à tela toda
  bottom: 20,                 // Distância da parte de baixo da tela
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,      // Para não grudar nas bordas
},
signupText: {
  color: '#FFFFFF',
  fontSize: 15,
},
signupLink: {
  color: '#48D1CC',
  fontSize: 15,
}
});
