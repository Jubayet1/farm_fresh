const http = require('http'); 
const fs = require('fs'); 
const replaceTemplate = require('./Components/replace');


const overviewData = fs.readFileSync('./Templates/overview.html', 'utf-8');
const ProductData = fs.readFileSync('./Templates/product.html', 'utf-8');
const cardData = fs.readFileSync('./Templates/card.html', 'utf-8');
const data = fs.readFileSync('./Data/Data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{
    const pathName = req.url;
    if (pathName === '/' || pathName === "/overview") {
        res.writeHead(200, {contentType: 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(cardData, el)).join('');
        const output = overviewData.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    } else if (pathName === "/product") {
        res.end("hello from product");
    } else{
        res.end("found nothing")
    };
});


server.listen(8000, () => {
    console.log('listening to the port')
})