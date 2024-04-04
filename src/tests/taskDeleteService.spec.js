const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory");
const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory");

const TaskCreateService = require("../services/TaskServices/TaskCreateService");
const UserCreateService = require("../services/UserServices/UserCreateService");
const TaskDeleteService = require("../services/TaskServices/TaskDeleteService");
const TaskListService = require("../services/TaskServices/TaskListService")

describe('TaskDeleteService', () => {
    let userRepository = null;
    let userCreateService = null;
    
    let taskRepository = null;
    let taskCreateService = null;
    let taskDeleteService = null;
    let taskListService = null

    beforeEach(() => {
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)

        taskRepository = new TaskRepositoryInMemory();
        taskCreateService = new TaskCreateService(taskRepository);
        taskDeleteService = new TaskDeleteService(taskRepository);
        taskListService = new TaskListService(taskRepository);
    });

    it("should be able to delete a task", async () => {
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

        const taskCreate = await taskCreateService.execute(task, userCreated.user_id)

        const deleteTask = await taskDeleteService.execute(taskCreate)
        const list = await taskListService.execute()
        
        expect(list).not.toHaveProperty("title", "testando api com jest")
    })
})