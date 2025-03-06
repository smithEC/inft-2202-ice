import http from 'node:http';

console.log("This is a http server");

const options = {};

const handler = (req, res) => {
    const { url, method } = req;
    console.log('got a request');

    const headers = {
        'Content-Type': 'text/plain'
    };

    if (url === '/' && method === 'GET') {
        res.writeHead(200, headers);
        res.end(`You requested ${method} ${url}`);
    }
    else if (url === '/contact' && method === 'GET') {
        res.writeHead(200, headers);
        res.end(`Contact ${method} ${url}`);
    }
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, headers);
        res.end(`About ${method} ${url}`);
    }
    else {
        res.writeHead(404, headers);
        res.end(`Something went wrong ${method} ${url}`);
    }

};
const app = http.createServer(options, handler);
app.listen(3000, () => {
    console.log('server is running on port 3000');
});
