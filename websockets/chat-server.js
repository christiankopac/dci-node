// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more
"use strict";

// Optional: You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';

// WebSocket Server Port
var webSocketServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

// Global variables: chat history and clients list
var history = [];
var clients = [];

// Helper: escaping input strings
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot');
}

// Array with colors
var colors = [ 'PaleTurquoise', 'PaleVioletRed', 'PeachPuff', 'PowderBlue', 'SeaGreen', 'Sienna', 'Plum'];
colors.sort(function(a,b) { return Math.random() > 0.5;});


/* HTTP Server */
var server = http.createServer(function(req, res) {
  // using websocket server, not the http server
});
server.listen(webSocketServerPort, function() {
    console.log((new Date()) + " Server listening on port " + webSocketServerPort);
});

/* WebSocket Server */
var wsServer = new webSocketServer({
    // WebSocket server is tied to an HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

wsServer.on('request', function(request){
    console.log((new Date()) + " Connection from origin " + request.origin + ".");
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;
    var userName = false;
    var userColor = false;
    
    console.log((new Date()) + " Connection accepted");
  
    if (history.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'history', data: history } ));
    }

    /*
    connection.on('message', function(message){
        if(message.type === 'utf-8') {
            if(userName === false) {
                userName = htmlEntities(message.utf8Data);
                userColor = colors.shift();
                connection.sendUTF(JSON.stringify({type: 'color', data: userColor }));
                console.log((new Date()) + ' User is known as: ' + userName + ' with ' + userColor + ' color.');
            }
            else {
                // log and broadcast the message
                console.log((new Date()) + ' Received message from ' + userName + ': ' + message.utf8Data);
                // keep chat history stored
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);

                // broadcast message to all connected clients
                var json = JSON.stringify({ type: 'message', data: obj});
                for(var i = 0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    */
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            if (userName === false) {
                userName = htmlEntities(message.utf8Data);
                userColor = colors.shift();
                connection.sendUTF(JSON.stringify({type: 'color', data: userColor}));
                console.log((new Date()) + ' User is known as: ' + userName + ' with ' + userColor + ' color.');
            } else {
                console.log((new Date()) + ' Recieved message from ' + userName + ': ' + message.utf8Data);
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);
                
                var json = JSON.stringify({type: 'message', data: obj});
                
                for (var i=0;i<clients.length;i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });

    // close connection
      connection.on('close', function(connection) {
        if (userName !== false && userColor !== false) {
          console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
          clients.splice(index, 1);
          colors.push(userColor);
        }
      });
});
