import ConexaoHTTP from './ConexaoHTTP';

export default class Divida {
	static consultarDividas() {
		const url = 'Divida/GetOData';
		return ConexaoHTTP.get(url);
	}
}
