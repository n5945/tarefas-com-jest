const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserDeleteService = require("../services/UserServices/UserDeleteService")
const UserListService = require("../services/UserServices/UserListService")

describe("UserDeleteService", () => {
    let userRepository = null
    let userCreateService = null
    let userDeleteService = null
    let userListService = null

    it("user should be delete an user", async () => {
        const user = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userDeleteService = new UserDeleteService(userRepository)
        userListService = new UserListService(userRepository)

        await userCreateService.execute(user)
        await userDeleteService.execute(user);
        const users = await userListService.execute(user)
        expect(users).toHaveLength(0)
    })
    it("user should be delete an specific user", async () => {


        const user1 = {
            name: "user test 1",
            email: "user1@test.com",
            password: "123"
        }
        const user2 = {
            name: "user test 2",
            email: "user2@test.com",
            password: "123"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userDeleteService = new UserDeleteService(userRepository)
        userListService = new UserListService(userRepository)

        await userCreateService.execute(user1)
        const secondUser = await userCreateService.execute(user2)
        const list = await userListService.execute()
        const secondUserId = list.find(user => user.user_id === secondUser.user_id)
        console.log(secondUserId);

        await userDeleteService.execute(secondUserId);
        
        // expect(list).not.HaveProperty("name", "user test 2")
    })
})