
class UserRepositoryInMemory {
    users = []

    async createUser({name, email, password}) {
        const user = {
            user_id: Math.floor(Math.random() * 1000) + 1,
            name,
            email,
            password
        }
        this.users.push(user)
        return user
    }

    async listUsers() {
        return this.users
    }

    async listUserById({user_id}) {
        const user = this.users.find(user => user.id === user_id)
        return user
    }

    async updateUser({user_id, name, email}) {
       const user = this.listUserById({user_id})

        user.name = name ?? user.name
        user.email = email ?? user.email

        return user
    }

    async deleteUser({user_id}) {
        return this.users.splice(user => user.id === user_id)
    }
}

module.exports = UserRepositoryInMemory