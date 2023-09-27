import ConexaoHTTP from './ConexaoHTTP';

export default class Clientes {
	static consultarClientes(filtroNome) {
		const filter = `$filter=contains(nome, '${filtroNome}')`;
		const url = `Cliente/GetOData?${filter}`;
		return ConexaoHTTP.get(url);
	}
}
