const http = require('http'); 
const fs = require('fs'); 


const data = fs.readFileSync('./Data/Data.json', 'utf-8', (err, data) => {
    console.log(data);
});
const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{
    const pathName = req.url;
    if (pathName === '/' || pathName === "/overview") {
        res.writeHead(200, {contentType: 'application/json'});
        res.end(data);
    } else if (pathName === "/product") {
        res.end("hello from product");
    } else{
        res.end("found nothing")
    };
});


server.listen(8000, () => {
    console.log('listening to the port')
})