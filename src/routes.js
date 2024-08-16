import { TaskService } from "./services/task.service.js";
import { buildRoutePath } from "./utils/build-route-path.js";


export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {
            
            const tasks = TaskService.getAll(req.query)
            return res.end(JSON.stringify(tasks));
        }
    },
    {
        method: 'GET',
        path: '/tasks/:id',
        handler: (req, res) => {

            try {
                const { id } = req.params;

                const task = TaskService.getById(id, true)
                return res.writeHead(200).end(JSON.stringify(task));
            } catch (err) {

                return res.writeHead(404).end(JSON.stringify({
                    status: 'Not found',
                    message: String(err)
                }));
            }
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {


            try {

                console.log(req.body)
                const data = TaskService.create(req.body);

                return res.writeHead(201).end(JSON.stringify(data));

            } catch (err) {
                console.log(String(err))
                return res.writeHead(400).end(JSON.stringify({
                    status: 'Bad request',
                    message: String(err)
                }));
            }
        }
    },
    {
        method: 'PUT',
        path: '/tasks/:id',
        handler: (req, res) => {
            try {

                const { id } = req.params;

                const data = TaskService.edit(id, req.body);

                return res.writeHead(200).end(JSON.stringify(data));

            } catch (err) {

                return res.writeHead(404).end(JSON.stringify({
                    status: 'Not found',
                    message: String(err)
                }));
            }
        }
    },
    {
        method: 'DELETE',
        path: '/tasks/:id',
        handler: (req, res) => {
            try {

                const { id } = req.params;

                TaskService.delete(id);

                return res.writeHead(202).end();

            } catch (err) {

                return res.writeHead(404).end(JSON.stringify({
                    status: 'Not found',
                    message: String(err)
                }));
            }
        }
    },
    {
        method: 'PATH',
        path: '/tasks/:id/complete',
        handler: (req, res) => {
            try {

                const { id } = req.params;

                const task = TaskService.getById(id, true);

                const data = TaskService.edit(id, {
                    completed_at: task.completed_at ? null : new Date()
                })

                return res.writeHead(200).end(JSON.stringify(data));

            } catch (err) {

                return res.writeHead(404).end(JSON.stringify({
                    status: 'Not found',
                    message: String(err)
                }));
            }
        }
    },
].map(route => Object.assign(route, { path: buildRoutePath(route.path) }));