/*global require, module, console*/
var express = require('express'),
    status = require('http-status'),
    gpio = require('gpio'),
    router = express.Router(),
    gpioArray = [],
    index;

for (index = 17; index < 18; index += 1) {
    gpioArray[index] = gpio.export(index, {
        direction: 'out',
        interval: 200,
        ready: function () {
            console.log('Pin ' + index + ' was exported');
        }
    });
}

router.get('/enable/:id', function (request, response) {
    var id = request.params.id;
    if (gpioArray[id] === undefined) {
        response.status(status.NOT_FOUND)
            .send();
    } else {
        gpioArray[id].set();
        response.status(status.OK)
            .send();
    }
});

router.get('/disable/:id', function (request, response) {
    var id = request.params.id;
    if (gpioArray[id] === undefined) {
        response.status(status.NOT_FOUND)
            .send();
    } else {
        gpioArray[id].reset();
        response.status(status.OK)
            .send();
    }
});

module.exports = router;
