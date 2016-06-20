/*global require, module, console*/
var express = require('express'),
    status = require('http-status'),
    gpio = require('gpio'),
    router = express.Router(),
    availableGpios = [4, 17, 27, 22, 10, 9, 11, 5, 6, 13, 19, 26, 14, 15, 18, 23, 24, 25, 8, 7, 16, 20, 21],
    gpioArray = [],
    index,
    len;

for (index = 0, len = availableGpios.length; index <= len; index += 1) {
    var pin = availableGpios[index];
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

router.get('/pins', function (request, response) {
    var CT = 'Content-Type',
        CT_JSON = 'application/json';
    response.status(status.OK).header(CT, CT_JSON).send({
        pins: availableGpios
    });
});

module.exports = router;
