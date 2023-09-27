import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { MainApplication } from '../../components';
import { Divida } from '../../api';
import styles from './styles';
import { ScrollView } from 'react-native';

const initialState = {
	qtd: 0,
	valor: 0,
};

const AppScreen = () => {
	const [dividasTotal, setDividasTotal] = useState(initialState);
	const [dividasPagas, setDividasPagas] = useState(initialState);
	const [dividasAberto, setDividasAberto] = useState(initialState);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		const carregarDividas = async () => {
			await Divida.consultarDividas().then(response => {
				const dividasTotal = calcularDividasTotal(
					response.data.d.results,
				);
				const dividasPagas = calcularDividasPagas(
					response.data.d.results,
				);
				const dividasAberto = calcularDividasAberto(
					response.data.d.results,
				);

				setDividasTotal(dividasTotal);
				setDividasPagas(dividasPagas);
				setDividasAberto(dividasAberto);
				setLoad(true);
			});
		};

		carregarDividas();
	}, []);

	const calcularDividasTotal = dividas => {
		const qtd = dividas.length;
		let valor = 0;

		dividas.map(divida => {
			valor += divida.valor;
		});

		return { qtd, valor };
	};

	const calcularDividasPagas = dividas => {
		const dividasPagas = dividas.filter(
			divida => divida.dataPagamento != undefined,
		);
		const qtd = dividasPagas.length;
		let valor = 0;

		dividasPagas.map(divida => {
			valor += divida.valor;
		});

		return { qtd, valor };
	};

	const calcularDividasAberto = dividas => {
		const dividasAberto = dividas.filter(
			divida => divida.dataPagamento == undefined,
		);
		const qtd = dividasAberto.length;
		let valor = 0;

		dividasAberto.map(divida => {
			valor += divida.valor;
		});

		return { qtd, valor };
	};

	return (
		<MainApplication load={load}>
			<ScrollView style={styles.mainContainer}>
				<View style={styles.panelDivida}>
					<Text style={styles.panelTitulo}>Dívidas em aberto</Text>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Qtde:</Text>
						<Text style={styles.linhaValor}>
							{dividasAberto.qtd}
						</Text>
					</View>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Valor total:</Text>
						<Text style={styles.linhaValor}>
							R$ {dividasAberto.valor}
						</Text>
					</View>
				</View>
				<View style={styles.panelDivida}>
					<Text style={styles.panelTitulo}>Dívidas pagas</Text>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Qtde:</Text>
						<Text style={styles.linhaValor}>
							{dividasPagas.qtd}
						</Text>
					</View>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Valor total:</Text>
						<Text style={styles.linhaValor}>
							R$ {dividasPagas.valor}
						</Text>
					</View>
				</View>
				<View style={styles.panelDivida}>
					<Text style={styles.panelTitulo}>Dívidas cadastradas</Text>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Qtde:</Text>
						<Text style={styles.linhaValor}>
							{dividasTotal.qtd}
						</Text>
					</View>
					<View style={styles.panelLinha}>
						<Text style={styles.linhaLabel}>Valor total:</Text>
						<Text style={styles.linhaValor}>
							R$ {dividasTotal.valor}
						</Text>
					</View>
				</View>
			</ScrollView>
		</MainApplication>
	);
};

export default AppScreen;
