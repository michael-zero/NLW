import path from 'path'

module.exports = { //knex n usa export default, por isso usa o module.exports
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite'),
    }, //__dirname retorna o diretorio aonde o arquivo esta hospedado (server)
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }
    , useNullAsDefault: true,
}