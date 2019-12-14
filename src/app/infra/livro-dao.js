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

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT * 
                    FROM livros
                    WHERE id = ?
                    `,
                [id]
                , (error, livro) => {
                    if (error) {
                        console.error(error)
                        return reject("Não foi possível buscar o livros");
                    }
                    resolve(livro);
                });
        })
    }

    adiciona({ titulo, preco, descricao }) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO livros(
                titulo,
                preco,
                descricao
            ) values(?, ?, ?)
                `, [
                titulo,
                preco,
                descricao
            ], function (error) {
                if (error) {
                    console.error(error);
                    return reject('Não foi possível adicionar o livro!');
                }
                resolve();
            }
            )

        })
    }

    atualiza({ id, titulo, preco, descricao }) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            UPDATE 
                livros
            SET 
                titulo = ?,
                preco = ?,
                descricao = ?
            WHERE 
                id = ? 
                `, [
                titulo,
                preco,
                descricao,
                id
            ], function (error) {
                if (error) {
                    console.error(error);
                    return reject('Não foi possível atualizar o livro!');
                }
                resolve();
            }
            )

        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            DELETE 
            FROM 
                livros 
            WHERE
                id = ?
                    `,
                [id],
                function (error) {
                    if (error) {
                        console.error(error);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            )

        })
    }
}

module.exports = LivroDao;