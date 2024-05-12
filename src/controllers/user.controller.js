const User = require('../models/User')

const UserController = {
    getAll: async (req, res) => {
        try {
            const response = await User.getAll()

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = UserController