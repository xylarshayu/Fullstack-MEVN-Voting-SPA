import https from 'https';
import http from 'http';

export default function ({ $axios, redirect }) {
	$axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
	$axios.defaults.httpAgent = new http.Agent({ rejectUnauthorized: false });
}