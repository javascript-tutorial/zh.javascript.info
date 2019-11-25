const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
const busboy = require('async-busboy');
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
<<<<<<< HEAD
    message: "User saved."
=======
    message: "User saved"
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
  };
});

router.post('/image-form', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
<<<<<<< HEAD
      // 读取所有文件流（file stream），然后继续
=======
      // read all file stream to continue
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });
    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}.`
=======
    message: `Image saved, firstName: ${fields.firstName}, Image size:${files[0].length}, fileName: ${files[0].filename}`
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
  };
});


router.post('/user-avatar', async (ctx) => {

  let files = [];
  const { fields } = await busboy(ctx.req, {
    onFile(fieldname, file, filename, encoding, mimetype) {
<<<<<<< HEAD
      // 读取所有文件流，然后继续
=======
      // read all file stream to continue
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
      let length = 0;
      file.on('data', function(data) {
        length += data.length;
      });
      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          length
        });
      });

    }
  });

  ctx.body = {
<<<<<<< HEAD
    message: `User with picture, firstName: ${fields.firstName}, picture size:${files[0].length}.`
=======
    message: `User with picture, firstName: ${fields.firstName}, picture size:${files[0].length}`
>>>>>>> 79417c6e73645d37f184f0cc7e4bc3353e85224f
  };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
