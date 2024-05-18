const User = require('../models/User')

const UserController = {
    getAll: async (req, res) => {
        try {
            const response = await User.getAll()

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },

    getByNIP: async (req, res) => {
        try {
            const userId = req.params.userId

            const response = await User.getByNIP(userId)

            res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = UserController