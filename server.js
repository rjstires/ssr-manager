const express = require('express')
const next = require('next')
const fs = require('fs');
const path = require('path');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const cookieParser = require('cookie-parser');

const serviceWorker = path.join(__dirname, 'serviceWorker.js');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '127.0.0.1';

app.prepare()
  .then(() => {
    const server = express({})

    server.use(cookieParser())

    server.get(`/linodes/:linodeId`, (req, res) => {
      const { params } = req;

      if (params.linodeId) {
        const actualPage = `/linode`
        return app.render(req, res, actualPage, req.params);
      }

      return handle(req, res);
    });

    server.get('*', (req, res) => {
      const parsedURL = parse(req.url, true);
      const { pathname } = parsedURL;
      if (pathname === `/serviceWorker.js`) {

        res.setHeader(`content-type`, `text/javascript`);
        fs.createReadStream(serviceWorker).pipe(res);
      }

      return handle(req, res)
    });

    server
      .listen({ host, port }, (err) => {
        if (err) throw err
        console.log(`> And we're off!`)
      });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
