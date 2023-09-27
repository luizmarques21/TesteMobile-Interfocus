import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Clientes, Divida } from '../../api';
import { MainApplication } from '../../components';
import Listagem from '../../components/Listagem';
import { InputAcao } from '../../components/Form';
import styles from './styles';
import FloatingActionButton from '../../components/FAB';

const ClientesScreen = () => {
	const [clientes, setClientes] = useState([]);
	const [dividas, setDividas] = useState([]);
	const [filtroNome, setFiltroNome] = useState('');
	const [load, setLoad] = useState(true);

	useEffect(() => {
		const carregarDividas = async () => {
			await Divida.consultarDividas().then(response => {
				setDividas(response.data.d.results);
				carregarClientes();
			});
		};

		carregarDividas();
	}, []);

	const carregarClientes = async () => {
		await Clientes.consultarClientes(filtroNome).then(response => {
			const clientes = formatarClientes(response.data.d.results);
			setClientes(clientes);
			setLoad(true);
		});
	};

	const formatarClientes = clientes => {
		return clientes
			.map(cliente => {
				let valorDevido = 0;
				dividas
					.filter(divida => divida.cliente.id == cliente.id)
					.map(divida => (valorDevido += divida.valor));

				return { ...cliente, valorDevido };
			})
			.sort((clienteA, clienteB) =>
				clienteA.valorDevido - clienteB.valorDevido ? 1 : -1,
			);
	};

	renderCardCliente = ({ i, item }) => {
		return <Listagem.CardCliente key={i} item={item} />;
	};

	return (
		<MainApplication>
			<View style={styles.container}>
				<View style={styles.cabecalho}>
					<InputAcao
						value={filtroNome}
						icone='search'
						returnKeyType='search'
						returnKeyLabel='Pesquisar'
						onPress={() => {
							setLoad(false);
							carregarClientes();
						}}
						onSubmitEditing={() => {
							setLoad(false);
							carregarClientes();
						}}
						onChangeText={value => setFiltroNome(value)}
						placeholder='Digite o nome do cliente'
					/>
				</View>
				<Listagem.Lista
					lista={clientes}
					renderItem={this.renderCardCliente}
					style={styles.listaConvenios}
					carregandoLista={load}
					carregarLista={carregarClientes}
				/>
				<FloatingActionButton />
			</View>
		</MainApplication>
	);
};

export default ClientesScreen;
