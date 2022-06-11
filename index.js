const http = require('http'); 
const fs = require('fs'); 
const url = require('url');
const replaceTemplate = require('./Components/replace');


const overviewData = fs.readFileSync('./Templates/overview.html', 'utf-8');
const ProductData = fs.readFileSync('./Templates/product.html', 'utf-8');
const cardData = fs.readFileSync('./Templates/card.html', 'utf-8');
const data = fs.readFileSync('./Data/Data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === '/' || pathname === "/overview") {
        res.writeHead(200, {contentType: 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(cardData, el)).join('');
        const output = overviewData.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } else if (pathname === "/product") {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(ProductData, product);
        res.end(output);
    } else{
        res.end("found nothing")
    };
});


server.listen(8000, () => {
    console.log('listening to the port')
})