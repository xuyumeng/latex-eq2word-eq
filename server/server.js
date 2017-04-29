'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mathjaxNode = require('mathjax-node');

var _mathjaxNode2 = _interopRequireDefault(_mathjaxNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convert = function convert(tex, success, error) {
    _mathjaxNode2.default.typeset({
        math: tex,
        format: "TeX",
        mml: true,
        svg: true
    }, function (data) {
        if (!data.errors) {
            success(data.mml, data.svg);
        } else {
            error(data.errors);
        }
    });
};

var app = (0, _express2.default)();
var port = 5001;

app.use(_bodyParser2.default.json()); // for parsing application/json

app.post('/api/convert-tex2mml', function (req, res) {
    console.log(req.ip, req.body.tex);
    convert(req.body.tex, function (mml, svg) {
        return res.json({
            result: 0,
            mml: mml,
            svg: svg
        });
    }, function (error) {
        return res.send({
            result: 1,
            message: error
        });
    });
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
