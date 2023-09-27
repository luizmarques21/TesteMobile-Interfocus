import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const CardCliente = ({ item }) => {
	const { nome, cpf, email, valorDevido } = item;

	return (
		<TouchableOpacity style={styles.card} onPress={() => {}}>
			<Text numberOfLines={2} ellipsizeMode='tail' style={styles.titulo}>
				{nome}
			</Text>
			<View style={styles.cardLinha}>
				<Text style={styles.linhaLabel}>CPF:</Text>
				<Text style={styles.linhaValor}>{cpf}</Text>
			</View>
			<View style={styles.cardLinha}>
				<Text style={styles.linhaLabel}>Email:</Text>
				<Text style={styles.linhaValor}>{email}</Text>
			</View>
			<View style={styles.linhaValorDevido}>
				<Text style={styles.titulo}>Valor da dívida:</Text>
				<Text style={styles.linhaLabel}>R$ {valorDevido}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CardCliente;
