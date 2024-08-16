import { randomUUID } from 'node:crypto';
import fs from 'node:fs/promises';

const databasePath = new URL('database.json', import.meta.url);


class Database {

    // # -> make private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search) {

        let data = this.#database[table] ?? [];

        if (search && Object.keys(search).length > 0) {
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {

                    return row[key]?.toLowerCase()?.includes(value.toLowerCase()) ?? true
                })
            })
        }

        return data;
    }


    insert(table, data) {

        let insertData = data;
        if (!insertData?.id) {
            insertData[id] = randomUUID();
        }
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(insertData)
        } else {
            this.#database[table] = [insertData]
        }
        this.#persist();
        return insertData;
    }

    delete(table, id) {

        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {

            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        } else {

            throw new Error('No row updated')
        }
    }

    update(table, id, data) {


        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        if (rowIndex > -1) {
            const current = this.#database[table][rowIndex];
            this.#database[table][rowIndex] = Object.assign(current, data);
            this.#persist();
        } else {

            throw new Error('No row updated')
        }
    }
}

export const database = new Database();