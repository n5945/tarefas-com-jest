const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")

const UserCreateService = require("../services/UserServices/UserCreateService")

const TaskUpdateService = require("../services/TaskServices/TaskUpdateService")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const TaskListService = require("../services/TaskServices/TaskListService")

describe("TaskUpdateService", () => {
    let userRepository = null
    let taskRepository = null
    let userCreateService = null
    let taskCreateService = null
    let taskListService = null
    let taskUpdateService = null

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)

        taskRepository = new TaskRepositoryInMemory();
        taskCreateService = new TaskCreateService(taskRepository);
        taskListService = new TaskListService(taskRepository);
        taskUpdateService = new TaskUpdateService(taskRepository);
    });

    it("should be able to update a task", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123"
        }
        const userCreated = await userCreateService.execute(user);

        const task = {
            title: "Testando api com Jest",
            description: "Elaborar testes unitários na aplicação",
            user_id: userCreated.user_id
        }

        const taskCreated = await taskCreateService.execute(task)

        taskCreated.title = "Tarefa atualizada",
        taskCreated.description = "Descrição atualizada"

        const taskUpdated = await taskUpdateService.execute(taskCreated)

        expect(taskUpdated).toHaveProperty("title", "Tarefa atualizada")
    })
})