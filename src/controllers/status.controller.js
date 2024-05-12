const Status = require('../models/Status')

const StatusController = {
    getAll: async (req, res) => {
        try {
            const response = await Status.getAll()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = StatusController