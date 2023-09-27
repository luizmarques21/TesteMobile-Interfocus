import React from 'react';
import { FlatList } from 'react-native';
import ActivityIndicatorApp from '../Comum/ActivityIndicatorApp';
import EstadoVazio from '../Comum/EmptyState';

const Lista = ({
	habilitarPaginacao = true,
	carregarLista,
	lista,
	carregandoLista,
	renderItem,
	refresh = false,
	textoEstadoVazio = 'Nenhum item disponível',
	topoLista = null,
	rodapeLista = null,
	style,
	onRefresh = () => {},
	contentContainerStyle = { flexGrow: 1 },
	onEndReachedThreshold = 0.2,
}) => {
	const listaVazia = () => {
		return refresh || carregandoLista ? (
			<ActivityIndicatorApp />
		) : (
			<EstadoVazio message={textoEstadoVazio} />
		);
	};

	return (
		<FlatList
			style={style}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={contentContainerStyle}
			data={lista}
			keyExtractor={(item, key) =>
				Math.random()
					.toString(36)
					.replace(/[^a-z]+/g, '')
					.substr(0, 11)
			}
			renderItem={renderItem}
			onEndReached={habilitarPaginacao ? carregarLista : undefined}
			onEndReachedThreshold={onEndReachedThreshold}
			onRefresh={() => onRefresh()}
			refreshing={refresh}
			ListEmptyComponent={listaVazia}
			ListHeaderComponent={topoLista}
			ListFooterComponent={rodapeLista}
		/>
	);
};

export default Lista;
