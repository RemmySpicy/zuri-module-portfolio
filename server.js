const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/html'})
    // fs.readFile('index.html', (error, data) => {
    //     if (error) {
    //         res.writeHead(404)
    //         res.write('Error: File Not Found!')
    //     } else {
    //         res.write(data)
    //     }
    //     res.end()
    // })

    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url )
    let contentType = getContentType(filePath) || 'text/html';
    let emptyPagePath = path.join(__dirname, '', '404.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err === 'ENOENT') {
                res.writeHead(404)
                res.write('Error: File not found') 
            } else {
                res.writeHead(500)
                res.write('A server error has occured')
            }
        }

        if (!err) {
            res.writeHead(200, {'Content-Type': contentType})
            res.write(data)
        }
    })

    // if (req === '/') {
    //     const aboutFilePath = path.join(__dirname, 'about', 'about.html')
    //     fs.readFile(aboutFilePath, 'utf8', (error, data) => {
    //         res.writeHead(200, {'Content-Type': 'text/html'})
    //         res.write(data)
    //         res.end()
    //     })
    // }
});

// const contactFilePath = path.join(__dirname, 'contact', 'contact.html')

const getContentType = (filePath) => {
    const extName = path.extname(filePath);

    if (extName === '.js') return 'text/javascript';
    if (extName === '.css') return 'text/css';
    if (extName === '.jpg') return 'img/jpg';
    // if (extName === '.js') return 'text.javascript';
}

server.listen(port, (error) => {
    if (error) console.log("Something went wrong", error)
    else console.log('Server is listening on port', port)
});