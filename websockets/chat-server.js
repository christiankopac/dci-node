/* HTTP Server */

var server - http.createServer(function(req, res) {

})
server.listen(webSocketServerPort, function() {
    console.log()
})

/* WebSocket Server */

var wsServer = new webSocketServer({
    httpServer: server
})

wsServer.on('request', function(request))