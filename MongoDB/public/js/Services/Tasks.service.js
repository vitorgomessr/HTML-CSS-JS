import { createFetch } from "../createFetch.js"
import { Task } from "../task.model.js"
import { urlTasks } from "../config.js"

export default class TasksServices{
    constructor(){
        this.tasks = []
    }

    add(task, cb, error, userId){
        createFetch("POST", `${urlTasks}`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err))
    }

    getTasks(userId, success, error){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, _id } = task
                return new Task(title, completed, createdAt, updatedAt, _id)
            })

            if(typeof success === "function") success(this.tasks)
            return this.tasks
        }
        return createFetch("GET", `${urlTasks}`)
            .then(response => fn(response))
            .catch(erro => {
                if(typeof error === "function"){
                    return error(erro.message)
                }
                throw new Error(erro.message)
            })
    }

    remove(id, cb, error, userId){
        createFetch("DELETE", `${urlTasks}/${id}`)
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err.message))
    }

    update(task, cb, error, userId){
        task.updatedAt = Date.now()
        createFetch("PATCH", `${urlTasks}/${task._id}`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err.message))
    }

    getById(id){
        const fn = response => {
            const {title, completed, createdAt, updatedAt, _id} = response
            const _task = new Task(title, completed, createdAt, updatedAt, _id)
            return _task
        }

        return createFetch("GET", `${urlTasks}/${id}`)
            .then(response => fn(response))
            .catch(erro => {
                if(typeof error === "function"){
                    return error(erro.message)
                }
                throw new Error(erro.message)
            })
    }
}