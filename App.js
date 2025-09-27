import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';
import HomeScreen from './screens/HomeScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import PerfilScreen from './screens/PerfilScreen';
import PedidosScreen from './screens/PedidosScreen';
import MapaScreen from './screens/MapaScreen';

import Login from './screens/Login';

const Tab = createBottomTabNavigator();

const MyTabs = () => {

  return (
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoScreen}
        options={{
          tabBarLabel: 'Carrinho',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="note-edit" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapaScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [logado, setLogado] = useState(false)
  
  return (
    <View style={styles.container}>
      {logado ? (
        <NavigationContainer>
          <MyTabs/>
        </NavigationContainer>
      ) : (
        <Login logado={(e) => setLogado(e)}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

});
