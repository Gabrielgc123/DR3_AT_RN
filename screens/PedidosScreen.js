import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import * as Notifications from "expo-notifications";
import CheckVerde from "../components/CheckVerde";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const DATA = [
  {
    id: '4',
    data: '26/09/2025 - 20:31',
    quantidadeItens: 5,
    status: 'Em andamento',
    produtos: [
      { nome: 'Cheeseburger', preco: 13.5 },
      { nome: 'Milkshake de Morango', preco: 12.0 },
      { nome: 'Pizza de Calabresa', preco: 39.9 },
      { nome: 'Refrigerante', preco: 6.0 },
      { nome: 'Brownie com Sorvete', preco: 14.0 },
    ],
    endereco: 'Av. Atlântica, 1702 - Copacabana (Copacabana Palace), Rio de Janeiro - RJ',
    lugar: 'Restaurante Pérgula',
  },
  {
    id: '3',
    data: '26/09/2025 - 20:08',
    quantidadeItens: 3,
    status: 'Em andamento',
    produtos: [
      { nome: 'X-Bacon', preco: 22.5 },
      { nome: 'Suco de Laranja', preco: 11.5 },
      { nome: 'Petit Gateau', preco: 16.0 },
    ],
    endereco: 'R. República do Peru, 212 - Copacabana, Rio de Janeiro - RJ',
    lugar: 'Bunda De Fora',
  },
  {
    id: '2',
    data: '21/09/2025 - 22:33',
    quantidadeItens: 5,
    status: 'Entregue',
    produtos: [
      { nome: 'Pizza Marguerita', preco: 42.0 },
      { nome: 'Refrigerante', preco: 6.0 },
      { nome: 'Hot Dog', preco: 12.0 },
      { nome: 'Batata Frita Média', preco: 15.0 },
      { nome: 'Torta de Limão', preco: 13.0 },
    ],
    endereco: 'R. Rodolfo Dantas, 26 - Copacabana, Rio de Janeiro - RJ',
    lugar: 'Canton',
  },
  {
    id: '1',
    data: '18/09/2025 - 21:22',
    quantidadeItens: 5,
    status: 'Entregue',
    produtos: [
      { nome: 'Sopa de Ervilha', preco: 18.0 },
      { nome: 'Pizza Quatro Queijos', preco: 41.0 },
      { nome: 'Suco de Uva', preco: 8.5 },
      { nome: 'Cheesecake', preco: 13.0 },
      { nome: 'Wrap de Frango', preco: 18.5 },
    ],
    endereco: 'R. Rodolfo Dantas, 16 - Copacabana, Rio de Janeiro - RJ',
    lugar: 'Churrascaria Palace',
  },
];

const ItemPedidos = ({ id, data, quantidadeItens, status, onPress }) => (
  <TouchableOpacity style={styles.itemPedidoContainer} onPress={onPress}>
    <Text style={styles.texto}>Pedido: #{id}</Text>
    <Text style={styles.texto}>Data: {data}</Text>
    <Text style={styles.texto}>Quantidade de itens: {quantidadeItens}</Text>
    <Text style={[styles.texto, status === 'Entregue' ? styles.entregue : styles.andamento]}>
      Status: {status}
    </Text>
  </TouchableOpacity>
);

const Itemcheckout = ({
  id,
  data,
  quantidadeItens,
  status,
  setInput1,
  setInput2,
  input1,
  input2,
  lugar,
  endereco,
  onConfirm,
  onVoltar, 
  animacao
}) => (
  <>
    <View style={styles.itemPedidoContainer}>
      <Text style={styles.texto}>Pedido: #{id}</Text>
      <Text style={styles.texto}>Data: {data}</Text>
      <Text style={styles.texto}>Quantidade de itens: {quantidadeItens}</Text>
      {status !== 'Entregue' ? (
        <>
        {animacao ? <><CheckVerde/></> : <></>}
          <Text style={styles.titulo}>Confirme os dados</Text>
          <TextInput
            style={styles.input}
            onChangeText={setInput1}
            value={input1}
            placeholder="Digite o método de pagamento"
            placeholderTextColor="black"
          />
          <TextInput
            style={styles.input}
            onChangeText={setInput2}
            value={input2}
            placeholder="Digite o seu endereço"
            placeholderTextColor="black"
          />
          <TouchableOpacity style={styles.itemPedidoContainer} onPress={onConfirm}>
            <Text style={styles.btn}>Confirmar dados</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.texto, status === 'Entregue' ? styles.entregue : styles.andamento]}>
          Status: {status}
        </Text>
      )}
      <Text style={styles.texto}>Lugar: {lugar}</Text>
      <Text style={styles.texto}>Endereço: {endereco}</Text>
    </View>
    <TouchableOpacity style={styles.itemPedidoContainer} onPress={onVoltar}>
      <Text style={[styles.btn, { backgroundColor: 'white' }]}>Voltar</Text>
    </TouchableOpacity>
  </>
);

export default function PedidosScreen() {

  const [abrirPedido, setAbrirPedido] = useState(false);
  const [id, setId] = useState();
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [animacao, setAnimaca] = useState(false)

  async function handleConfirmar() {
    if (input1 && input2) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Boa!',
          body: `Pedido confirmado!`,
        },
        trigger: null,
      });

      setAnimaca(true)
      setInterval(() => {setAnimaca(false)}, 5000)

    } else {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Falha!',
          body: `Preencha todos os campos.`,
        },
        trigger: null,
      });
    }
  }

  return (
    <ScrollView style={styles.container} >
      <Text style={styles.titulo}>Pedidos</Text>
      {abrirPedido ? (
        <FlatList
          data={DATA.filter(item => item.id === id)}
          renderItem={({ item }) => (
            <Itemcheckout
              id={item.id}
              data={item.data}
              quantidadeItens={item.quantidadeItens}
              status={item.status}
              setInput1={setInput1}
              setInput2={setInput2}
              input1={input1}
              input2={input2}
              lugar={item.lugar}
              endereco={item.endereco}
              onConfirm={handleConfirmar}
              onVoltar={() => setAbrirPedido(false)}
              animacao={animacao}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <ItemPedidos
              id={item.id}
              data={item.data}
              quantidadeItens={item.quantidadeItens}
              status={item.status}
              onPress={() => {
                setId(item.id);
                setAbrirPedido(true);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemPedidoContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  entregue: {
    color: 'green',
    fontWeight: '700',
  },
  andamento: {
    color: 'orange',
    fontWeight: '700',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  btn: {
    backgroundColor: 'lightgreen',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10,
  }
});
