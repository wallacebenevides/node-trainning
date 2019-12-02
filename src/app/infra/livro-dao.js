class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', (error, results) => {
                if (error) {
                    console.error(error)
                    return reject("Não foi possível listar os livros");
                }

                resolve(results);
            });
        })
    }
}

module.exports = LivroDao;