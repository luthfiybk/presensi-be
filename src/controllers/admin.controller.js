const { json } = require('body-parser')
const Admin = require('../models/Admin')

const AdminController = {
    dashboard: async (req, res) => {
        try {
            const response = await Admin.dashboard()

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = AdminController