import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function CriarScreen({ logado }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleCriarConta() {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos');
      return;
    }
    let nomeVariavel = nome;
    let emailVariavel = email;
    let senhaVariavel = senha;
    logado(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/infnetfoodLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="black"
      />

      <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

function EntrarScreen({ logado }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogar() {
    if (!email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }
    let nomeVariavel = email;
    let emailVariavel = senha;
    logado(true);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/infnetfoodLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.titulo}>Entrar</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="black"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Login({ logado }) {
 
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4287f5' },
        headerTintColor: 'black',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#4287f5',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Criar"
        component={() => <CriarScreen logado={logado} />}
        options={{
          tabBarLabel: 'Criar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={30} />
          ),
        }}
        />
        <Tab.Screen
        name="Entrar"
        component={() => <EntrarScreen logado={logado} />}
        options={{
          tabBarLabel: 'Entrar',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={30} />
          ),
        }}
        />
    </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  titulo: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderColor: 'transparent',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 50,
  },
  button: {
    backgroundColor: 'black',
    borderWidth: 4,
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
