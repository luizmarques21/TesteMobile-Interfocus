import axios from 'axios';

const ConexaoHTTP = axios.create({
	baseURL: 'https://modeloproxyapi.interfocus.com.br:4443/api',
	timeout: 20000,
});

export default ConexaoHTTP;
