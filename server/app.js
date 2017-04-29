import express from 'express'
import bodyParser from 'body-parser'
import mjAPI from 'mathjax-node'

const convert = (tex,success,error) => {
    mjAPI.typeset({
        math: tex,
        format: "TeX",
        mml:true,
        svg: true
    }, function (data) {
        if (!data.errors) {
            success(data.mml,data.svg)
        } else {
            error(data.errors)
        }
    });
};

let app = express();
const port = 5001;

app.use(bodyParser.json()); // for parsing application/json

app.post('/api/convert-tex2mml', function (req, res) {
    console.log(req.ip, req.body.tex);
    convert(
        req.body.tex,
        (mml,svg) => res.json({
            result: 0,
            mml: mml,
            svg: svg
        }),
        error => res.send({
            result: 1,
            message: error
        })
    );
});

app.listen(port, function () {
    console.log('Example app listening on port '+ port +'!')
});