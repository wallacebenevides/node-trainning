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
        const updateTemplateLivros = livros => res.marko(require('../views/livros/listagem-livros/listagem-livros'), { livros });
        livroDao.lista()
        .then(updateTemplateLivros)
        .catch(console.error);
    });
}
