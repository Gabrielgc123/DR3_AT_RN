import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function CarrinhoScreen() {

  const [quantidades, setQuantidades] = useState({});
  const [produtos, setProdutos] = useState([]);

  function handleAumentar(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

  function handleDiminuir(id) {
    setQuantidades((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  }

  async function obterProdutos() {
    try {
      const carrinhoJson = await AsyncStorage.getItem('@carrinho');
      const carrinhoAtual = carrinhoJson ? JSON.parse(carrinhoJson) : [];
      setProdutos(carrinhoAtual);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  }

  async function excluirProduto(id) {
    try {
      const carrinhoJson = await AsyncStorage.getItem('@carrinho');
      const carrinhoAtual = carrinhoJson ? JSON.parse(carrinhoJson) : [];

      const novoCarrinho = carrinhoAtual.filter((item) => item.id !== id);
      await AsyncStorage.setItem('@carrinho', JSON.stringify(novoCarrinho));

      obterProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      obterProdutos();
    }, [])
  );

  async function handlePedidoConfirmado() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Boa!',
        body: `Confirme seus dados na tela de pedidos!`,
      },
      trigger: null,
    });
    return;
  }

  return (
    <>
      <TouchableOpacity
        onPress={handlePedidoConfirmado}
        style={styles.confirmarBtn}>
        <Text style={styles.texto}></Text>
        <Text style={styles.texto}>Confirmar pedido</Text>
        <Text style={styles.texto}></Text>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Carrinho</Text>
        {produtos.map((produto) => {
          const quantidade = quantidades[produto.id] || 1;
          return (
            <View key={produto.id} style={styles.itemProdutoContainer}>
              <View style={styles.infoProduto}>
                <Text style={styles.texto}>{produto.nome}</Text>
                <Text style={styles.textoPreco}>
                  R$ {(produto.preco * quantidade).toFixed(2)}
                </Text>
              </View>

              <View style={styles.btnsCard}>
                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => handleDiminuir(produto.id)}>
                  <Text style={styles.btnsText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantidadeText}>{quantidade}</Text>

                <TouchableOpacity
                  style={styles.btns}
                  onPress={() => handleAumentar(produto.id)}>
                  <Text style={styles.btnsText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.excluirBtn}
                  onPress={() => excluirProduto(produto.id)}>
                  <Text style={styles.excluirText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </>
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
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemProdutoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoProduto: {
    flex: 1,
  },
  texto: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  textoPreco: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 5,
  },
  btnsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btns: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  quantidadeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 5,
  },
  excluirBtn: {
    marginLeft: 10,
  },
  excluirText: {
    color: '#ff4d4d',
    fontWeight: '700',
  },
  confirmarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgreen',
    padding: 15,
  },
});
