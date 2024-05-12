const LogActivity = require('../models/LogActivity')

const LogActivityController = {
    getAll: async (req, res) => {
        try {
            const response = await LogActivity.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    createLog: async (req, res) => {
        try {
            const userId = req.session.userId
            const activity = req.body.activity

            const response = await LogActivity.createLog(userId, activity)

            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = LogActivityController