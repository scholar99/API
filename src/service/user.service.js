import User from '../model/user.model.js'
class UserService {
    async createUser(user_name, password) {
        const res = await User.create({ user_name, password })
        return res.dataValues
    }
    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        return res?.dataValues || null
    }
    async updateUser({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}
        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })
        const res = await User.update(newUser, { where: whereOpt })
        return res[0] ? true : false
    }
}

export default new UserService()