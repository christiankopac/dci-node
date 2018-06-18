var fs = require('fs');
var http = require('http');

http.createServer((req, res) => {
    fs.readFile('ex2.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        fs.appendFile('ex2-file1.txt', data, (err) => {
            if (err) throw err;
            console.log('Create a new file using the appendFile() method:');
        });
        fs.writeFile('ex2-file2.txt', data, (err) => {
            if(err ) throw err
            console.log('Create a new file using the writeFile() method:')
        })
            res.write(data)
            res.end()
    })
    fs.open('ex2-open.html', 'wx', (err, data) => {
        if(err) throw err
        console.log('Create a new, empty file using the open() method')
    })
}).listen(8080)