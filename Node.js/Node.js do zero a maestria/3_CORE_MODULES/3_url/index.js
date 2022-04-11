const url  = require('url');
const address = 'https://www.mwusite.com.br/catalogo?produtos=cadeira';
const paresedUrl = new url.URL(address);

console.log(paresedUrl.host);
console.log(paresedUrl.pathname);
console.log(paresedUrl.search);
console.log(paresedUrl.searchParams);
console.log(paresedUrl.searchParams.get('produtos'));