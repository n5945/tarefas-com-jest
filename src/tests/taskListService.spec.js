const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")

const UserCreateService = require("../services/UserServices/UserCreateService")

const TaskListService = require("../services/TaskServices/TaskListService")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")

describe("TaskListService", () => {
    let userRepository = null
    let taskRepository = null
    let userCreateService = null
    let taskCreateService = null
    let taskListService = null

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)

        taskRepository = new TaskRepositoryInMemory();
        taskCreateService = new TaskCreateService(taskRepository);
        taskListService = new TaskListService(taskRepository);
    });

    it("should be able to create a new task", async () => {
        const user = {
            name: "User test",
            email: "user@test.com",
            password: "123"
        }
        const userCreated = await userCreateService.execute(user);

        const task1 = {
            title: "Testando api com Jest",
            description: "Elaborar testes unitários na aplicação",
            user_id: userCreated.user_id
        }

        const task2 = {
            title: "Testando api com Jest",
            description: "Elaborar testes unitários na aplicação",
            user_id: userCreated.user_id
        }

        await taskCreateService.execute(task1)
        await taskCreateService.execute(task2)

        const list = await taskListService.execute()
        expect(list).toEqual(expect.arrayContaining(list))
    })
})