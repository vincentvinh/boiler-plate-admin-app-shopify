import Knex from 'knex';
import Bookshelf from 'bookshelf';
import {Configs} from "../../config";

export const dbKnex = new Knex({
    client: 'mysql',
    connection: Configs.MySQL
});

export const dbConnection = new Bookshelf(dbKnex);