const Supervisor = require('../models/Supervisor')

const SupervisorController = {
    dashboard: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.dashboard(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getKaryawan: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getKaryawan(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getIzin: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getIzin(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    getPresensi: async (req, res) => {
        try {
            const divisiId = 1
            const response = await Supervisor.getPresensi(divisiId)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = SupervisorController