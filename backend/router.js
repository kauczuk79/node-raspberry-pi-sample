/*global require, module, console*/
var express = require('express'),
    status = require('http-status'),
    gpio = require('pi-gpio'),
    router = express.Router();

router.get('/enable/:id', function (request, response) {
    var id = request.params.id;
    console.log('Enabling ' + id);
    gpio.open(id, 'output', function (error) {
        if (error) {
            console.log(error);
            return;
        }
        gpio.write(id, 1, function () {
            gpio.close(id);
        });
    });
    response.status(status.OK)
        .send();
});

router.get('/disable/:id', function (request, response) {
    var id = request.params.id;
    console.log('Disabling ' + id);
    gpio.open(id, 'output', function (error) {
        if (error) {
            console.log(error);
            return;
        }
        gpio.write(id, 0, function () {
            gpio.close(id);
        });
    });
    response.status(status.OK)
        .send();
});

module.exports = router;
