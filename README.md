# latex-eq2word-eq
Using mathjax-node as server-end and react app as client to transform tex equation to MathML which can be used in Microsoft Word

## install
```bash
npm install
npm install babel-cli --save-dev
```

Webpack dev server
```bash
npm start
```

Compile Client
```bash
npm build
```

Run server in local (Require babel-cli)
```bash
npm server
```

Compile Server (Compile server side with webpack will throw error when running because of jsdom)
```bash
babel server/app.js --out-file dist/server.js
```
