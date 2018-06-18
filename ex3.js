var http = require('http')
// fetch about or contact page
// when not found return 404

var url = require('url')
var fs = require('fs')

http.createServer(function(req, res){
    var q = url.parse(req.url, true)
    console.log(q.pathname)
    if(q.pathname === '/contact'){ 
        fs.readFile('contact.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();         
        }
    )}
    else if (q.pathname === '/about'){
        fs.readFile('about.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();      
        }
    )}
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
    } 
}).listen(8080)