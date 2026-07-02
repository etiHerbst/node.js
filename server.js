import http from 'http';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('שלום משרת ה-Node.js שלי!');
});

server.listen(3000, () => {
    console.log('השרת רץ בהצלחה בכתובת http://localhost:3000');
});