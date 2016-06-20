(function () {
    'use strict';
    /*global require, console*/
    var express = require('express'),
        backendApi = require('./backend/router'),
        app = express(),
        server;

    app.use('/api', backendApi);

    app.use('/', express.static('frontend'));
    app.use('/libs/angular', express.static('node_modules/angular'));

    server = app.listen(3000, function () {
        var host = server.address()
            .address,
            port = server.address()
            .port;
        console.log('Listening on http://%s:%s', host, port);
    });
}());
