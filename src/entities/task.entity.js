import { randomUUID } from 'node:crypto';


export class Task {

    id;
    title;
    description;
    completed_at;
    created_at;
    updated_at;


    constructor(title, description) {
        const now = new Date();
        this.id = randomUUID();
        this.title = title;
        this.description = description;
        this.created_at = now;
        this.completed_at = null;
        this.updated_at = now;
    }

    toObj() {

        return {
            id: this.id,
            title: this.title,
            description: this.description,
            created_at: this.created_at,
            completed_at: this.completed_at,
            updated_at: this.updated_at,
        }
    }

    toString() {
        return JSON.stringify(this.toObj())
    }
}