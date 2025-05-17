import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconInput from '../../components/ui/IconInput';



export default function LoginScreen() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if(!email || !senha) {
      Alert.alert('Por favor, preencha email e senha');
      return;
    }
  
    setLoading(true);

    try {

      const response = await axios.post('https://backend-production-9ab9.up.railway.app/login', {
        email,
        senha
      });

      if(response.status === 200) {
        const data = response.data;

        Alert.alert('Login efetuado com sucesso!');

        //await AsyncStorage.setItem('token', data.token);
      } else {
        Alert.alert('Erro', 'Erro inesperado no Login');
      }
    } catch(error: unknown) {
      if(axios.isAxiosError(error)) {
        if (error.response){
          console.log('Erro de resposta do servidor', error.response.data);
        } else if (error.request) {
          Alert.alert('Erro', 'Servidor não respondeu. Tente novamente');
        } else {
            Alert.alert('Erro', 'Erro ao tentar fazer login.');
        }
      } 
    } finally {
      setLoading(false);
    };
  }
  
  
  
  return (
   <View style={styles.container}>
    <StatusBar barStyle={'light-content'} backgroundColor={'#0D223F'} />

      <View style= {styles.logoContainer}>
        <Image
          source={require('../../assets/images/logoImpetus.png')}
          resizeMode="contain"
          style={styles.logo}
          />
        <Text style={styles.loginTitle}>IMPETUS</Text>
      </View>

    <View style={styles.contentContainer}>
        <IconInput value={email} onChangeText={setEmail} keyboardType={"email-address"} iconName="envelope" placeholder="Email ou Nome de Usuário" secureTextEntry={false} color={'#A9A9A9'}/>
        <IconInput value={senha} onChangeText={setSenha} keyboardType={"default"} iconName="lock" placeholder="Senha" secureTextEntry={true} color={'#A9A9A9'}/>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 20}}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/forgotPassword')}>
            <Text style={{color: '#48D1CC'}}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.loginButton, loading && {opacity: 0.6}]}
          onPress={handleLogin}
          disabled={loading}
          >
  <Text style={styles.loginButtonText}>
    {loading ? 'Carregando...' : 'Entrar'}
  </Text>
</TouchableOpacity>
    </View>
    <View style={styles.containerSeparator}>
      <View style={styles.separator}>
        <View style={styles.line}></View>
        <Text style={styles.textLine}>OU</Text>
        <View style={styles.line}></View>
      </View>
    </View>   
    <TouchableOpacity style={styles.googleBtn}>
      <View style={styles.content}>
        <FontAwesome name="google" size={25} color="#0D223F" />
        <Text style={styles.text}>ENTRAR COM O GOOGLE</Text>
      </View>
    </TouchableOpacity>

    <View style= {styles.signupContainer}>
      <Text style={styles.signupText}>Ainda não tem uma conta?</Text>
      <TouchableOpacity onPress={() => router.push('/(tabs)/signUp')}> <Text style={styles.signupLink}> Cadastre-se</Text> </TouchableOpacity>
    </View>
    

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

    backgroundColor: '#0000000',

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
