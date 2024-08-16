import { database } from "../database.js";
import { Task } from "../entities/task.entity.js";



class Service {

    #table = 'tasks';


    create(body) {

        const required = ['title', 'description'];

        required.forEach(item => {

            if (!body[item]) {

                throw new Error(`Required attribute "${item}" must be informed.`)
            }
        })

        const task = new Task(body.title, body.description);

        database.insert(this.#table, task.toObj())

        return this.getById(task.id, true);
    }

    edit(id, body) {

        try {
            let data = {
                updated_at: new Date()
            }

            const allowedAttributes = ['title', 'description'];

            allowedAttributes.forEach(att => {

                if (body[att]) {
                    data[att] = body[att]
                }
            })

            database.update(this.#table, id, Object.assign(data, {
                updated_at: new Date()
            }));


            return this.getById(id, true)

        } catch(err) {
         
            throw new Error(`There is no task with id "${id}"`);
        }
    }

    delete(id) {

        try {
            database.delete(this.#table, id);
        } catch {
            throw new Error(`There is no task with id "${id}"`);
        }
    }

    getById(id, throws) {

        const task = database.select(this.#table).find(task => task.id === id);

        if (task) {
            return task;
        }

        if (throws) {
            throw new Error(`There is no task with id "${id}".`)
        }

        return null;
    }

    getAll(filters){

        return database.select(this.#table, filters)
    }




}


export const TaskService = new Service();