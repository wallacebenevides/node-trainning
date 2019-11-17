const app = require('./src/config/custom-express');
const routes = require('./src/app/routes/routes');

app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
})

routes(app);
