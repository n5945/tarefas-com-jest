const knex = require("../database/knex")

class TaskController {
    async createTask(req, res) {
        const {user_id} = req.params
        const { title, description } = req.body

        const task = {
            title,
            description,
            isCompleted: false,
            user_id
        }

       await knex("tasks").insert({
        title: task.title, 
        description: task.description, 
        isCompleted: task.isCompleted, 
        user_id: task.user_id
    } )

        return res.status(201).json("Tarefa criada com sucesso!")
    }

    async listTask(req, res) {
        const tasks = await knex("tasks")

        return res.status(200).json(tasks)
    }

    async listTaskById(req, res) {
        const { id } = req.params
        
        const task = await knex("tasks").where({id})
            return res.status(200).json(task)
        } 

    async updateTask(req, res) {
        const { id } = req.params
        const { title, description } = req.body

        await knex("tasks").where({id}).update({title, description})

        return res.status(200).json("Registro atualizado com sucesso!")
    }

    async updateTaskStatus(req, res) {
        const { id } = req.params
        await knex("tasks").where({id}).update({isCompleted: true})

        
        return res.status(200).json("Tarefa concluida com sucesso!")
    }

    async deleteTask(req, res) {
        const { id } = req.params

        await knex("tasks").where({id}).delete()

        return res.status(200).json("Registro deletado com sucesso!")
    }
}

module.exports = TaskController