// Excercise 1
// input:
// http://localhost:8080?author_name=Shelley%20Power&booktitle=Learning%20Node&year=2012
// output:
// Author's Name: Shelly Power
// Book title: Learning node
// Year: 2012

var http = require('http')
var url = require('url')

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'})
    var q = url.parse(req.url, true).query
    var txt = "Author's Name: " + q.author_name + '<br/>Book Title: ' + q.booktitle + '<br/>Year: ' + q.year
    console.log(txt)
    res.write(txt)
    res.end()
}).listen(8080)


/* 
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february' 
*/