const db = require('../../config/database');
const LivroDao = require('../infra/livro-dao');

const livroDao = new LivroDao(db);

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.send(`
        <html>
         <head>
           <meta charset="utf-8">
         </head>
               <body>
                 <h1> Casa do Código </h1>
               </body>
       </html>
       `);
  });


  app.get('/livros', function (req, res) {
    const updateTemplateLivros = livros => res.marko(require('../views/livros/lista/lista-livros'), { livros });
    livroDao.lista()
      .then(updateTemplateLivros)
      .catch(console.error);
  });


  app.post('/livros', function (req, res) {
    livroDao.adiciona(req.body)
      .then(res.redirect('/livros'))
      .catch(console.error);
  })

  app.put('/livros', function (req, res) {
    livroDao.atualiza(req.body)
      .then(res.redirect('/livros'))
      .catch(console.error);
  })

  app.delete('/livros/:id', function (req, res) {
    livroDao.remove(req.params.id)
      .then(res.redirect('/livros'))
      .catch(console.error);
  })

  app.get('/livro/:id', function (req, res) {
    const showLivro = livros => res.marko(require('../views/livros/lista/lista-livros'), { livros: [livros] });
    livroDao.buscaPorId(req.params.id)
      .then(showLivro)
      .catch(console.error);
  })

  app.get('/livros/form', function (req, res) {
    res.marko(require('../views/livros/form/form-livros'))
  })

}
