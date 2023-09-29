const http = require('http')
const url = require('url')
const { getDate } = require('./modules/utils')
const fs = require('fs');

const PORT = process.env.PORT || 8888

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query

    if (req.url === '/') {
        const indexPage = `
            <html>
            <head>
                <title>Lab 3 - Index</title>
            </head>
            <body>
                <h1>Lab 3 - Index</h1>
                <ul>
                    <li><a href="/COMP4537/labs/3/getDate">Get Date</a></li>
                    <li><a href="/COMP4537/labs/3/writeFile/">Write File</a></li>
                    <li><a href="/COMP4537/labs/3/readFile/file.txt/">Read File</a></li>
                </ul>
            </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexPage);
    } else if (req.url.startsWith('/COMP4537/labs/3/getDate')) {
        const name = query.name || 'Guest'
        const currentDate = getDate();
        const message = `<p style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${currentDate}</p>`;

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(message)
    } else if (req.url.startsWith('/COMP4537/labs/3/writeFile/')) {
        const text = query.text || '';
        const filePath = './file.txt';

        fs.appendFile(filePath, `${text}\n`, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Appended "${text}" to file.txt`);
        });
    } else if (req.url === '/COMP4537/labs/3/readFile/file.txt') {
        const filePath = './file.txt';

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`File not found: ${filePath}`);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }

})

server.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}...`)
})
