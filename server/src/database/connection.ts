import knex from 'knex';
import path from 'path'; // bib para trabalhar com caminhos

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //resolve: une caminhos
    },
    useNullAsDefault: true,

});

export default connection;