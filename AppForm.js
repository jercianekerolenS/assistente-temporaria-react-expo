import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking  } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Database from './Database';

export default function AppForm({ route, navigation }) {

    const id = route.params ? route.params.id : undefined;
    const [descricao, setDescricao] = useState(''); 
    const [quantidade, setQuantidade] = useState('');
    const [quantidadehora, setQuantidadehora] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
        setQuantidadehora(route.params.quantidadehora.toString());
      }, [route])
    
    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    function handleHourChange(quantidadehora){ setQuantidadehora(quantidadehora)}

    async function handleButtonPress(){ 
        const listItem = {descricao, quantidade: parseInt(quantidade)};
        Database.saveItem(listItem, id)
          .then(response => navigation.navigate("Solicitações", listItem));
        const total = quantidade*quantidadehora*12
        console.log(total)

          Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
            if (supported) {
              return Linking.openURL(
                `whatsapp://send?phone=558188987713&text=Olá, quero contratar um(a) assistente temporario para o serviço: ${descricao}, por ${quantidade} dias, carga horaria de ${quantidadehora} horas por dia, valor do serviço, ${total} Reais`
              );
            } else {
              return Linking.openURL(
                `https://api.whatsapp.com/send?phone=558188987713&text=Olá, quero contratar um(a) assistente temporario para o serviço: ${descricao}, por ${quantidade} dias, carga horaria de ${quantidadehora} horas por dia, valor do serviço, ${total} Reais`
              );
            }
          })

      }



  return (
<View style={styles.container}>
      <Text style={styles.title}>Assistente temporaria</Text>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          onChangeText={handleDescriptionChange} 
          placeholder="Digite o serviço?"
          clearButtonMode="always"
          value={descricao} />  
        <TextInput 
          style={styles.input} 
          onChangeText={handleQuantityChange} 
          placeholder="Por quantos dias deseja contratar?" 
          keyboardType={'numeric'}
          clearButtonMode="always" 
          value={quantidade.toString()} />
          <TextInput 
          style={styles.input}
          onChangeText={handleHourChange}   
          placeholder="Quantas hrs de serviço por dia?" 
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidadehora.toString()} /> 
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <View style={styles.buttonContainer}>
                <Icon name="save" size={22} color="white" />
                <Text style={styles.buttonText}>Enviar</Text> 
            </View>
        </TouchableOpacity>
        <Text style={styles.Text}>valor por hora = 12 reais</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0000CD',
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 50,
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch'
    },
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: 'blue',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: "row"
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      }
  });